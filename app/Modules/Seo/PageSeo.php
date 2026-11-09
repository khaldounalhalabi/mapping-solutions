<?php

namespace App\Modules\Seo;

use App\Models\Product;
use App\Models\Supplier;
use App\Models\NewsArticle;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Model;
use App\Modules\Settings\App\Services\SettingService;

class PageSeo
{
    private function text(mixed $value): string
    {
        if ($value instanceof Translatable) {
            $value = $value->translate();
        }

        if (! is_string($value)) {
            return '';
        }

        return Str::squish(html_entity_decode(strip_tags($value), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
    }

    /**
     * @return array{title: string, description: string, robots: string, canonical: ?string, alternates: array<string, string>, locale: string, image: ?string, imageAlt: string, type: string, structuredData: array<string, mixed>}
     */
    public function build(Request $request, ?Model $record = null, ?Supplier $supplier = null): array
    {
        $locale = app()->getLocale();
        $seo = [
            'title'          => config('app.name'),
            'description'    => '',
            'robots'         => 'noindex, nofollow',
            'canonical'      => null,
            'alternates'     => [],
            'locale'         => $locale,
            'image'          => null,
            'imageAlt'       => '',
            'type'           => 'website',
            'structuredData' => [],
        ];
        if (! $this->isIndexable($request)) {
            return $seo;
        }

        $route = $request->route()->getName();
        $key = config('seo.pages')[$route];
        $name = $this->text($record?->getAttribute($record instanceof NewsArticle ? 'title' : ($key === 'vacancy' ? 'title' : 'name')));
        $replacements = ['name' => $name, 'supplier' => $this->text($supplier?->name)];
        $title = trans('seo.'.$key.'.title', $replacements);
        $description = $this->text($record?->getAttribute('excerpt'))
            ?: $this->text($record?->getAttribute('description'))
            ?: $this->text(trans('seo.'.$key.'.description', $replacements));
        $page = $route === 'site.news' ? max(1, $request->integer('page', 1)) : 1;
        if ($page > 1) {
            $title .= ' — '.trans('seo.page', ['page' => $page]);
        }
        $canonical = $this->url($route, $request->route()->parameters(), $locale, $page);
        $alternates = [];
        foreach (config('cubeta-starter.available_locales') as $language) {
            $alternates[$language] = $this->url($route, $request->route()->parameters(), $language, $page);
        }
        $alternates['x-default'] = $alternates[config('cubeta-starter.default_locale')];
        $origin = rtrim(config('app.url'), '/');
        $image = $record?->getAttribute('hero_image')?->url ?? $origin.'/images/logo.jpg';
        if (str_starts_with($image, '/')) {
            $image = $origin.$image;
        }
        $seo = array_replace($seo, [
            'title'       => $this->text($title).' | Mapping Solutions',
            'description' => Str::limit($description, 160, '…'),
            'robots'      => 'index, follow, max-image-preview:large',
            'canonical'   => $canonical,
            'alternates'  => $alternates,
            'image'       => $image,
            'imageAlt'    => $name ?: 'Mapping Solutions',
            'type'        => $record instanceof NewsArticle ? 'article' : 'website',
        ]);

        $organization = ['@type' => 'Organization', '@id' => $origin.'/#organization', 'name' => 'Mapping Solutions', 'url' => $origin.'/', 'logo' => $origin.'/images/logo.jpg'];
        $settings = SettingService::make();
        foreach (['contact_email' => 'email', 'contact_phone' => 'telephone', 'address' => 'address'] as $setting => $property) {
            $value = $this->text($settings->valueOf($setting));
            if ($value !== '') {
                $organization[$property] = $value;
            }
        }
        $socials = [];
        foreach (['facebook_url', 'instagram_url', 'linkedin_url', 'youtube_url'] as $setting) {
            $value = $settings->valueOf($setting);
            if (is_string($value) && filter_var($value, FILTER_VALIDATE_URL)) {
                $socials[] = $value;
            }
        }
        if ($socials !== []) {
            $organization['sameAs'] = $socials;
        }
        $website = ['@type' => 'WebSite', '@id' => $origin.'/#website', 'name' => 'Mapping Solutions', 'url' => $origin.'/', 'publisher' => ['@id' => $organization['@id']]];
        $webpage = [
            '@type' => match ($key) {
                'contact'                                                                                                               => 'ContactPage',
                'about'                                                                                                                 => 'AboutPage',
                'products', 'suppliers', 'news', 'services', 'applications', 'careers', 'supplier', 'technology', 'technology_supplier' => 'CollectionPage',
                default                                                                                                                 => 'WebPage',
            },
            '@id' => $canonical.'#webpage', 'url' => $canonical, 'name' => $seo['title'], 'description' => $seo['description'], 'inLanguage' => $locale, 'isPartOf' => ['@id' => $website['@id']],
        ];
        $graph = [$organization, $website, $webpage];
        if ($key !== 'home') {
            $items = [['@type' => 'ListItem', 'position' => 1, 'name' => trans('seo.home.label'), 'item' => $this->url('site.index', [], $locale)]];
            $parent = match ($key) {
                'product', 'technology', 'technology_supplier' => 'site.products',
                'supplier'                                     => 'site.suppliers',
                'article'                                      => 'site.news',
                'vacancy'                                      => 'site.careers',
                default                                        => null,
            };
            if ($parent !== null) {
                $items[] = ['@type' => 'ListItem', 'position' => count($items) + 1, 'name' => trans('seo.'.config('seo.pages')[$parent].'.title'), 'item' => $this->url($parent, [], $locale)];
            }
            $items[] = ['@type' => 'ListItem', 'position' => count($items) + 1, 'name' => $this->text($title), 'item' => $canonical];
            $graph[] = ['@type' => 'BreadcrumbList', '@id' => $canonical.'#breadcrumbs', 'itemListElement' => $items];
        }
        if ($record instanceof NewsArticle) {
            $graph[] = ['@type' => 'Article', 'headline' => $name, 'description' => $seo['description'], 'image' => $image, 'datePublished' => $record->created_at->toAtomString(), 'dateModified' => $record->updated_at->toAtomString(), 'publisher' => ['@id' => $organization['@id']], 'mainEntityOfPage' => ['@id' => $webpage['@id']], 'inLanguage' => $locale];
        }
        if ($record instanceof Product) {
            $product = ['@type' => 'Product', 'name' => $name, 'description' => $seo['description'], 'image' => $image, 'url' => $canonical];
            if ($record->supplier !== null) {
                $product['brand'] = ['@type' => 'Brand', 'name' => $this->text($record->supplier->name)];
            }
            $graph[] = $product;
        }
        $seo['structuredData'] = ['@context' => 'https://schema.org', '@graph' => $graph];

        return $seo;
    }

    public function isIndexable(Request $request): bool
    {
        return in_array($request->method(), ['GET', 'HEAD'], true)
            && array_key_exists($request->route()?->getName() ?? '', config('seo.pages'));
    }

    public function url(string $route, array $parameters, string $locale, int $page = 1): string
    {
        $query = ['lang' => $locale];
        if ($page > 1) {
            $query['page'] = $page;
        }

        return rtrim(config('app.url'), '/').route($route, [...$parameters, ...$query], false);
    }
}
