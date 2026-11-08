<?php

namespace Tests\Feature;

use DOMXPath;
use DOMDocument;
use Tests\TestCase;
use App\Models\Product;
use App\Models\Vacancy;
use App\Models\Supplier;
use App\Models\NewsArticle;
use App\Models\ProductTechnology;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Console\Scheduling\Schedule;
use App\Http\Controllers\v1\WEB\SiteController;
use App\Modules\Sitemap\GenerateSitemapCommand;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

class SitemapTest extends TestCase
{
    use LazilyRefreshDatabase;

    /** @return array<string, array{alternates: array<string, string>, lastmod: ?string}> */
    private function entries(): array
    {
        $index = $this->xml('sitemap.xml');
        $entries = [];
        foreach ($index->query('/s:sitemapindex/s:sitemap/s:loc') as $location) {
            $xpath = $this->xml(ltrim(parse_url($location->textContent, PHP_URL_PATH), '/'));
            foreach ($xpath->query('/s:urlset/s:url') as $entry) {
                $url = $xpath->evaluate('string(s:loc)', $entry);
                $this->assertArrayNotHasKey($url, $entries);
                $alternates = [];
                foreach ($xpath->query('h:link', $entry) as $alternate) {
                    $alternates[$alternate->getAttribute('hreflang')] = $alternate->getAttribute('href');
                }
                $entries[$url] = [
                    'alternates' => $alternates,
                    'lastmod'    => $xpath->evaluate('string(s:lastmod)', $entry) ?: null,
                ];
            }
        }

        return $entries;
    }

    private function product(Supplier $supplier, ProductTechnology $technology): Product
    {
        return Product::factory()->for($supplier)->for($technology)->create([
            'product_family_id'   => null,
            'hero_image'          => null,
            'specifications_file' => null,
            'datasheet'           => null,
            'manual'              => null,
            'brochure'            => null,
        ]);
    }

    private function xml(string $path): DOMXPath
    {
        $document = new DOMDocument;
        $this->assertTrue($document->loadXML(Storage::disk('sitemap')->get($path), LIBXML_NONET));
        $xpath = new DOMXPath($document);
        $xpath->registerNamespace('s', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        $xpath->registerNamespace('h', 'http://www.w3.org/1999/xhtml');

        return $xpath;
    }

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('sitemap');
        config(['app.url' => 'https://canonical.example', 'sitemap.output_path' => Storage::disk('sitemap')->path('')]);
    }

    public function test_an_unregistered_dynamic_route_fails_without_replacing_the_previous_generation(): void
    {
        $this->artisan('sitemap:generate')->assertSuccessful();
        $previous = Storage::disk('sitemap')->get('sitemap.xml');
        $previousFiles = Storage::disk('sitemap')->allFiles();
        Route::get('/new/{slug}', [SiteController::class, 'about'])->name('site.new.dynamic');

        $this->artisan('sitemap:generate')
            ->expectsOutputToContain('Register a sitemap provider for dynamic public route [site.new.dynamic]')
            ->assertFailed();

        $this->assertSame($previous, Storage::disk('sitemap')->get('sitemap.xml'));
        $this->assertSame($previousFiles, Storage::disk('sitemap')->allFiles());
    }

    public function test_concurrent_generations_are_refused(): void
    {
        $lock = Cache::lock('sitemap:generate', 60);
        $lock->get();

        try {
            $this->artisan('sitemap:generate')->expectsOutputToContain('already running')->assertFailed();
            Storage::disk('sitemap')->assertMissing('sitemap.xml');
        } finally {
            $lock->release();
        }
    }

    public function test_discovers_all_static_public_pages_and_localizes_their_alternates(): void
    {
        $this->artisan('sitemap:generate')->assertSuccessful();

        $entries = $this->entries();
        $paths = ['/', '/products', '/suppliers', '/services', '/news', '/about', '/careers', '/contact', '/applications', '/privacy-policy', '/terms-and-conditions'];
        $expected = [];
        foreach ($paths as $path) {
            foreach (['en', 'ar', 'fr'] as $lang) {
                $url = 'https://canonical.example'.$path.'?lang='.$lang;
                $expected[] = $url;
                $this->assertSame([
                    'en'        => 'https://canonical.example'.$path.'?lang=en',
                    'ar'        => 'https://canonical.example'.$path.'?lang=ar',
                    'fr'        => 'https://canonical.example'.$path.'?lang=fr',
                    'x-default' => 'https://canonical.example'.$path.'?lang=en',
                ], $entries[$url]['alternates']);
                $this->assertNull($entries[$url]['lastmod']);
            }
        }
        $this->assertEqualsCanonicalizing($expected, array_keys($entries));
    }

    public function test_dynamic_pages_follow_records_real_relationships_and_vacancy_visibility(): void
    {
        $this->travelTo(now()->setDate(2026, 11, 9)->startOfDay());
        Storage::fake('public');
        $supplier = Supplier::factory()->create(['name' => 'Mapping Supplier', 'logo' => null]);
        $technology = ProductTechnology::factory()->create(['icon' => null]);
        $unusedTechnology = ProductTechnology::factory()->create(['icon' => null]);
        $product = $this->product($supplier, $technology);
        $this->product($supplier, $technology);
        $article = NewsArticle::factory()->create(['hero_image' => null]);
        $currentVacancy = Vacancy::factory()->create(['closing_date' => today()]);
        $expiredVacancy = Vacancy::factory()->create(['closing_date' => today()->subDay()]);

        $this->artisan('sitemap:generate')->assertSuccessful();

        $entries = $this->entries();
        foreach (['en', 'ar', 'fr'] as $lang) {
            $suffix = '?lang='.$lang;
            $this->assertArrayHasKey('https://canonical.example/products/'.$product->slug.$suffix, $entries);
            $this->assertArrayHasKey('https://canonical.example/news/'.$article->slug.$suffix, $entries);
            $this->assertArrayHasKey('https://canonical.example/suppliers/'.$supplier->slug.'/products'.$suffix, $entries);
            $this->assertArrayHasKey('https://canonical.example/products/product-technologies/'.$unusedTechnology->slug.$suffix, $entries);
            $this->assertArrayHasKey('https://canonical.example/products/product-technologies/'.$technology->slug.'/suppliers/'.$supplier->slug.$suffix, $entries);
            $this->assertArrayNotHasKey('https://canonical.example/products/product-technologies/'.$unusedTechnology->slug.'/suppliers/'.$supplier->slug.$suffix, $entries);
            $this->assertArrayHasKey('https://canonical.example/vacancy/'.$currentVacancy->slug.$suffix, $entries);
            $this->assertArrayNotHasKey('https://canonical.example/vacancy/'.$expiredVacancy->slug.$suffix, $entries);
        }
        $this->assertSame('2026-11-09T00:00:00+00:00', $entries['https://canonical.example/products/'.$product->slug.'?lang=en']['lastmod']);
    }

    public function test_generation_is_registered_daily_with_overlap_protection(): void
    {
        $events = collect(app(Schedule::class)->events())->filter(
            fn ($event): bool => str_contains($event->command ?? '', 'sitemap:generate'),
        );

        $this->assertCount(1, $events);
        $this->assertSame('0 2 * * *', $events->first()->expression);
        $this->assertTrue($events->first()->withoutOverlapping);
        $this->assertSame(GenerateSitemapCommand::class, app('Illuminate\Contracts\Console\Kernel')->all()['sitemap:generate']::class);
    }

    public function test_new_languages_follow_configuration_without_generator_changes(): void
    {
        config(['cubeta-starter.available_locales' => ['en', 'es']]);

        $this->artisan('sitemap:generate')->assertSuccessful();

        $entries = $this->entries();
        $this->assertCount(22, $entries);
        $this->assertSame([
            'en'        => 'https://canonical.example/?lang=en',
            'es'        => 'https://canonical.example/?lang=es',
            'x-default' => 'https://canonical.example/?lang=en',
        ], $entries['https://canonical.example/?lang=es']['alternates']);
    }

    public function test_new_static_routes_and_changed_paths_use_the_route_collection(): void
    {
        Route::get('/new-page', [SiteController::class, 'about'])->name('site.new.page');
        app('router')->getRoutes()->getByName('site.about')->setUri('renamed-about');
        Route::get('/private-page', [SiteController::class, 'about'])->middleware('authenticated:web')->name('site.private');
        Route::post('/submission', [SiteController::class, 'about'])->name('site.submission');
        app('router')->getRoutes()->refreshNameLookups();

        $this->artisan('sitemap:generate')->assertSuccessful();

        $entries = $this->entries();
        $this->assertArrayHasKey('https://canonical.example/new-page?lang=en', $entries);
        $this->assertArrayHasKey('https://canonical.example/renamed-about?lang=en', $entries);
        $this->assertArrayNotHasKey('https://canonical.example/about?lang=en', $entries);
        $this->assertArrayNotHasKey('https://canonical.example/private-page?lang=en', $entries);
        $this->assertArrayNotHasKey('https://canonical.example/submission?lang=en', $entries);
    }

    public function test_publication_failure_preserves_the_existing_index_and_cleans_staged_files(): void
    {
        Storage::disk('sitemap')->makeDirectory('sitemap.xml');
        Storage::disk('sitemap')->put('sitemap.xml/previous', 'previous generation');

        $this->artisan('sitemap:generate')->assertFailed();

        $this->assertSame(['sitemap.xml/previous'], Storage::disk('sitemap')->allFiles());
        $this->assertSame('previous generation', Storage::disk('sitemap')->get('sitemap.xml/previous'));
    }

    public function test_record_changes_and_expiry_are_reflected_on_the_next_generation(): void
    {
        $this->freezeTime();
        $vacancy = Vacancy::factory()->create(['closing_date' => today()]);
        $this->artisan('sitemap:generate')->assertSuccessful();
        $originalUrl = 'https://canonical.example/vacancy/'.$vacancy->slug.'?lang=en';
        $this->assertArrayHasKey($originalUrl, $this->entries());

        $vacancy->update(['slug' => 'updated-vacancy']);
        $this->artisan('sitemap:generate')->assertSuccessful();
        $this->assertArrayNotHasKey($originalUrl, $this->entries());
        $updatedUrl = 'https://canonical.example/vacancy/updated-vacancy?lang=en';
        $this->assertArrayHasKey($updatedUrl, $this->entries());

        $this->travel(1)->days();
        $this->artisan('sitemap:generate')->assertSuccessful();
        $this->assertArrayNotHasKey($updatedUrl, $this->entries());

        $vacancy->update(['closing_date' => today()]);
        $vacancy->delete();
        $this->artisan('sitemap:generate')->assertSuccessful();
        $this->assertArrayNotHasKey($updatedUrl, $this->entries());
    }

    public function test_robots_advertises_the_canonical_sitemap_without_authentication(): void
    {
        $this->get('/robots.txt')->assertOk()
            ->assertHeader('Content-Type', 'text/plain; charset=UTF-8')
            ->assertContent("User-agent: *\nDisallow:\n\nSitemap: https://canonical.example/sitemap.xml\n");
    }

    public function test_splits_by_byte_size_and_escapes_url_parameters(): void
    {
        config(['sitemap.max_bytes_per_file' => 2048]);
        $vacancy = Vacancy::factory()->create(['closing_date' => today()]);
        $vacancy->update(['slug' => 'research&development']);

        $this->artisan('sitemap:generate')->assertSuccessful();

        $this->assertArrayHasKey('https://canonical.example/vacancy/research&development?lang=en', $this->entries());
        $index = $this->xml('sitemap.xml');
        $this->assertGreaterThan(1, $index->query('/s:sitemapindex/s:sitemap/s:loc')->length);
        foreach ($index->query('/s:sitemapindex/s:sitemap/s:loc') as $location) {
            $path = ltrim(parse_url($location->textContent, PHP_URL_PATH), '/');
            $this->assertLessThanOrEqual(2048, Storage::disk('sitemap')->size($path));
        }
    }

    public function test_splits_files_and_keeps_previous_children_available_after_publication(): void
    {
        config(['sitemap.max_urls_per_file' => 2]);
        $this->artisan('sitemap:generate')->assertSuccessful();
        $previousFiles = array_values(array_filter(Storage::disk('sitemap')->allFiles(), fn (string $path): bool => $path !== 'sitemap.xml'));

        $this->artisan('sitemap:generate')->assertSuccessful();

        $index = $this->xml('sitemap.xml');
        $this->assertSame(17, $index->query('/s:sitemapindex/s:sitemap/s:loc')->length);
        foreach ($index->query('/s:sitemapindex/s:sitemap/s:loc') as $location) {
            $this->assertSame('/', dirname(parse_url($location->textContent, PHP_URL_PATH)));
            $child = $this->xml(ltrim(parse_url($location->textContent, PHP_URL_PATH), '/'));
            $this->assertLessThanOrEqual(2, $child->query('/s:urlset/s:url')->length);
        }
        Storage::disk('sitemap')->assertExists($previousFiles);
        $this->assertCount(33, $this->entries());
    }

    public function test_successful_publication_prunes_child_files_older_than_seven_days(): void
    {
        $this->artisan('sitemap:generate')->assertSuccessful();
        $previousFiles = array_values(array_filter(Storage::disk('sitemap')->allFiles(), fn (string $path): bool => $path !== 'sitemap.xml'));
        foreach ($previousFiles as $path) {
            touch(Storage::disk('sitemap')->path($path), now()->subDays(8)->getTimestamp());
        }

        $this->artisan('sitemap:generate')->assertSuccessful();

        Storage::disk('sitemap')->assertMissing($previousFiles);
        $this->assertCount(33, $this->entries());
    }
}
