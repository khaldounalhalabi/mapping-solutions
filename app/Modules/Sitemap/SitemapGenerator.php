<?php

namespace App\Modules\Sitemap;

use Generator;
use DOMDocument;
use RuntimeException;
use DateTimeInterface;
use Illuminate\Support\Str;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Illuminate\Routing\Route;
use Illuminate\Routing\Router;
use Spatie\Sitemap\SitemapIndex;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Contracts\Routing\UrlGenerator;

class SitemapGenerator
{
    public function __construct(
        private Filesystem $files,
        private Router $router,
        private UrlGenerator $urls,
    ) {}

    private function isPublicPage(Route $route): bool
    {
        if (! in_array('GET', $route->methods(), true) || $route->getName() === null
            || ! Str::is(config('sitemap.route_patterns'), $route->getName())
            || Str::is(config('sitemap.excluded_routes'), $route->getName())) {
            return false;
        }

        foreach ($route->gatherMiddleware() as $middleware) {
            if (is_string($middleware) && Str::is(['auth', 'auth:*', 'authenticated:*', 'signed', 'signed:*'], $middleware)) {
                return false;
            }
        }

        return true;
    }

    private function pruneOldGenerations(string $directory, string $version): void
    {
        try {
            foreach ($this->files->glob($directory.'/sitemap-*.xml') as $generation) {
                if (preg_match('/^sitemap-([a-f0-9-]{36})-\d+\.xml$/', basename($generation), $matches) === 1
                    && Str::isUuid($matches[1]) && $matches[1] !== $version
                    && $this->files->lastModified($generation) < now()->subDays(7)->getTimestamp()) {
                    $this->files->delete($generation);
                }
            }
        } catch (\Throwable $exception) {
            report($exception);
        }
    }

    /** @return Generator<int, Url> */
    private function tags(string $origin): Generator
    {
        $locales = array_values(array_unique(config('cubeta-starter.available_locales')));
        $defaultLocale = config('cubeta-starter.default_locale');
        if ($locales === [] || ! in_array($defaultLocale, $locales, true)) {
            throw new RuntimeException('The default locale must be included in the available sitemap locales.');
        }

        foreach ($this->router->getRoutes() as $route) {
            if (! $this->isPublicPage($route)) {
                continue;
            }

            $provider = config('sitemap.providers')[$route->getName()] ?? null;
            if ($route->parameterNames() !== [] && $provider === null) {
                throw new RuntimeException("Register a sitemap provider for dynamic public route [{$route->getName()}].");
            }

            $records = $provider === null ? [null] : app($provider['source'][0])->{$provider['source'][1]}();
            foreach ($records as $record) {
                $parameters = [];
                foreach ($provider['parameters'] ?? [] as $parameter => $attribute) {
                    $value = data_get($record, $attribute);
                    if (! is_scalar($value) || (string) $value === '') {
                        throw new RuntimeException("Missing sitemap parameter [{$parameter}] for [{$route->getName()}].");
                    }
                    $parameters[$parameter] = $value;
                }

                $alternates = [];
                foreach ($locales as $locale) {
                    $alternates[$locale] = $origin.$this->urls->route($route->getName(), [...$parameters, 'lang' => $locale], false);
                }

                foreach ($alternates as $url) {
                    $tag = Url::create($url);
                    foreach ($alternates as $locale => $alternate) {
                        $tag->addAlternate($alternate, str_replace('_', '-', $locale));
                    }
                    $tag->addAlternate($alternates[$defaultLocale], 'x-default');
                    $modifiedAt = data_get($record, 'updated_at');
                    if ($modifiedAt instanceof DateTimeInterface) {
                        $tag->setLastModificationDate($modifiedAt);
                    }

                    yield $tag;
                }
            }
        }
    }

    private function writeChunk(Sitemap $sitemap, SitemapIndex $index, string $origin, string $staging, string $version, int $number): void
    {
        if ($number > 50000) {
            throw new RuntimeException('Sitemap index exceeds the 50000-file limit.');
        }

        $filename = 'sitemap-'.$version.'-'.$number.'.xml';
        $this->writeXml($staging.'/'.$filename, $sitemap->render());
        $index->add($origin.'/'.$filename);
    }

    private function writeXml(string $path, string $xml): void
    {
        $document = new DOMDocument;
        $previous = libxml_use_internal_errors(true);
        try {
            $valid = $document->loadXML($xml, LIBXML_NONET);
        } finally {
            libxml_clear_errors();
            libxml_use_internal_errors($previous);
        }

        if (! $valid || strlen($xml) > 50000000) {
            throw new RuntimeException('Generated sitemap XML is invalid or exceeds 50 MB.');
        }
        if ($this->files->put($path, $xml) === false) {
            throw new RuntimeException("Unable to write sitemap file [{$path}].");
        }
    }

    public function generate(): int
    {
        $origin = rtrim(config('app.url'), '/');
        $originParts = parse_url($origin);
        if (! is_array($originParts) || ! in_array($originParts['scheme'] ?? null, ['http', 'https'], true)
            || empty($originParts['host']) || isset($originParts['query']) || isset($originParts['fragment'])
            || isset($originParts['user']) || isset($originParts['pass'])) {
            throw new RuntimeException('APP_URL must be an absolute HTTP(S) URL without credentials, query, or fragment.');
        }

        $maxUrls = (int) config('sitemap.max_urls_per_file');
        $maxBytes = (int) config('sitemap.max_bytes_per_file');
        if ($maxUrls < 1 || $maxUrls > 50000 || $maxBytes < 2048 || $maxBytes > 50000000) {
            throw new RuntimeException('Sitemap limits must be 1–50000 URLs and 2048–50000000 bytes.');
        }

        $output = rtrim(config('sitemap.output_path'), '/');
        $version = (string) Str::uuid();
        $staging = $output.'/sitemaps/.staging-'.$version;
        $temporaryIndex = $output.'/.sitemap-'.$version.'.tmp';
        $published = false;
        $publishedFiles = [];
        $this->files->ensureDirectoryExists($staging);

        try {
            $index = SitemapIndex::create();
            $sitemap = Sitemap::create();
            $seen = [];
            $count = 0;
            $chunkCount = 0;
            $bytes = 1024;
            $fileCount = 0;

            foreach ($this->tags($origin) as $tag) {
                if (isset($seen[$tag->url])) {
                    continue;
                }
                $seen[$tag->url] = true;
                $tagBytes = strlen(view('sitemap::url', ['tag' => $tag])->render());
                if ($tagBytes + 1024 > $maxBytes) {
                    throw new RuntimeException("Sitemap entry exceeds the byte limit: {$tag->url}");
                }
                if ($chunkCount > 0 && ($chunkCount >= $maxUrls || $bytes + $tagBytes > $maxBytes)) {
                    $this->writeChunk($sitemap, $index, $origin, $staging, $version, ++$fileCount);
                    $sitemap = Sitemap::create();
                    $chunkCount = 0;
                    $bytes = 1024;
                }
                $sitemap->add($tag);
                $bytes += $tagBytes;
                $chunkCount++;
                $count++;
            }

            if ($chunkCount > 0) {
                $this->writeChunk($sitemap, $index, $origin, $staging, $version, ++$fileCount);
            }
            if ($count === 0) {
                throw new RuntimeException('No public sitemap URLs were discovered.');
            }

            $this->writeXml($temporaryIndex, $index->render());
            foreach ($this->files->files($staging) as $file) {
                $destination = $output.'/'.$file->getFilename();
                $publishedFiles[] = $destination;
                if (! $this->files->move($file->getPathname(), $destination)) {
                    throw new RuntimeException('Unable to publish a sitemap child file; the previous sitemap was retained.');
                }
            }
            if (! $this->files->move($temporaryIndex, $output.'/sitemap.xml')) {
                throw new RuntimeException('Unable to publish sitemap files; the previous sitemap was retained.');
            }
            $published = true;
        } finally {
            $this->files->delete($temporaryIndex);
            $this->files->deleteDirectory($staging);
            if (! $published) {
                $this->files->delete($publishedFiles);
            }
        }

        $this->pruneOldGenerations($output, $version);

        return $count;
    }
}
