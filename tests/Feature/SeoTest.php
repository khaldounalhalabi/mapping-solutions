<?php

namespace Tests\Feature;

use DOMXPath;
use DOMDocument;
use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\Vacancy;
use App\Models\Supplier;
use App\Models\NewsArticle;
use App\Models\ProductTechnology;
use Inertia\Testing\AssertableInertia;
use Illuminate\Support\Facades\Storage;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

class SeoTest extends TestCase
{
    use LazilyRefreshDatabase;

    private function document(string $html): DOMXPath
    {
        $document = new DOMDocument;
        @$document->loadHTML('<?xml encoding="UTF-8">'.$html);

        return new DOMXPath($document);
    }

    private function graph(DOMXPath $document): array
    {
        return json_decode($document->evaluate('string(/html/head/script[@type="application/ld+json"])'), true, flags: JSON_THROW_ON_ERROR)['@graph'];
    }

    protected function setUp(): void
    {
        parent::setUp();
        config(['inertia.ssr.enabled' => false, 'app.url' => 'https://canonical.example']);
        Storage::fake('public');
    }

    public function test_all_static_pages_have_localized_metadata_in_initial_html_without_ssr(): void
    {
        $titles = [];
        foreach (['en', 'ar', 'fr'] as $locale) {
            foreach (['/', '/products', '/suppliers', '/services', '/news', '/about', '/careers', '/contact', '/applications', '/privacy-policy', '/terms-and-conditions'] as $path) {
                $response = $this->get($path.'?lang='.$locale.'&utm_source=test');
                $response->assertOk()->assertHeaderMissing('X-Robots-Tag');
                $document = $this->document($response->getContent());
                $title = $document->evaluate('string(/html/head/title)');
                $titles[] = $title;
                $this->assertStringEndsWith(' | Mapping Solutions', $title);
                $this->assertSame(1, $document->query('/html/head/title')->length);
                $this->assertSame('https://canonical.example'.$path.'?lang='.$locale, $document->evaluate('string(/html/head/link[@rel="canonical"]/@href)'));
                $this->assertNotEmpty($document->evaluate('string(/html/head/meta[@name="description"]/@content)'));
                $this->assertSame('index, follow, max-image-preview:large', $document->evaluate('string(/html/head/meta[@name="robots"]/@content)'));
                $this->assertSame($title, $document->evaluate('string(/html/head/meta[@property="og:title"]/@content)'));
                $this->assertSame(4, $document->query('/html/head/link[@rel="alternate"]')->length);
                foreach (['en', 'ar', 'fr', 'x-default'] as $language) {
                    $expectedLocale = $language === 'x-default' ? 'en' : $language;
                    $this->assertSame('https://canonical.example'.$path.'?lang='.$expectedLocale, $document->evaluate('string(/html/head/link[@hreflang="'.$language.'"]/@href)'));
                }
                $this->assertContains('Organization', array_column($this->graph($document), '@type'));
            }
        }
        $this->assertCount(33, array_unique($titles));
    }

    public function test_dashboard_auth_redirects_and_utilities_cannot_be_indexed(): void
    {
        foreach (['/v1/dashboard/login', '/v1/dashboard/request-reset-password', '/v1/dashboard/reset-password'] as $path) {
            $response = $this->get($path)->assertOk()->assertHeader('X-Robots-Tag', 'noindex, nofollow');
            $document = $this->document($response->getContent());
            $this->assertSame('noindex, nofollow', $document->evaluate('string(/html/head/meta[@name="robots"]/@content)'));
            $this->assertSame(0, $document->query('/html/head/link[@rel="canonical"]|/html/head/link[@rel="alternate"]|/html/head/script[@type="application/ld+json"]')->length);
        }
        foreach (['/v1/dashboard', '/v1/products', '/v1/news-articles'] as $path) {
            $this->get($path)->assertRedirect(route('v1.web.public.login.page'))->assertHeader('X-Robots-Tag', 'noindex, nofollow');
        }
        foreach (['/search?search=ab', '/suppliers/data', '/product-ranges/data', '/product-technologies/data', '/v1/newsletter/unsubscribe/1', '/up'] as $path) {
            $this->get($path)->assertHeader('X-Robots-Tag', 'noindex, nofollow');
        }
        $this->actingAs(User::factory()->create());
        foreach (['/v1/dashboard', '/v1/products'] as $path) {
            $this->get($path)->assertOk()->assertHeader('X-Robots-Tag', 'noindex, nofollow');
        }
    }

    public function test_dynamic_pages_use_real_localized_content_and_entity_data(): void
    {
        $supplier = Supplier::factory()->create(['name' => 'Acme', 'logo' => null]);
        $technology = ProductTechnology::factory()->create(['name' => '{"en":"Radar","ar":"رادار","fr":"Radar français"}', 'icon' => null]);
        $product = Product::factory()->for($supplier)->for($technology)->create([
            'name'              => '{"en":"Sensor One","ar":"المستشعر الأول","fr":"Capteur Un"}',
            'excerpt'           => '{"en":"Measure the landscape.","ar":"قياس التضاريس.","fr":"Mesurez le paysage."}',
            'product_family_id' => null, 'hero_image' => null, 'specifications_file' => null, 'datasheet' => null, 'manual' => null, 'brochure' => null,
        ]);
        $article = NewsArticle::factory()->create(['title' => '{"en":"New instrument","ar":"جهاز جديد","fr":"Nouvel instrument"}', 'hero_image' => null]);
        $vacancy = Vacancy::factory()->create(['title' => '{"en":"Engineer","ar":"مهندس","fr":"Ingénieur"}', 'closing_date' => today()->addWeek()]);
        $paths = [
            '/products/'.$product->slug,
            '/products/product-technologies/'.$technology->slug,
            '/products/product-technologies/'.$technology->slug.'/suppliers/'.$supplier->slug,
            '/suppliers/'.$supplier->slug.'/products',
            '/news/'.$article->slug,
            '/vacancy/'.$vacancy->slug,
        ];
        foreach (['en', 'ar', 'fr'] as $locale) {
            foreach ($paths as $path) {
                $response = $this->get($path.'?lang='.$locale)->assertOk();
                $document = $this->document($response->getContent());
                $this->assertSame('https://canonical.example'.$path.'?lang='.$locale, $document->evaluate('string(/html/head/link[@rel="canonical"]/@href)'));
                $graph = $this->graph($document);
                $this->assertContains('BreadcrumbList', array_column($graph, '@type'));
            }
        }
        $response = $this->get('/products/'.$product->slug.'?lang=fr')->assertOk();
        $document = $this->document($response->getContent());
        $this->assertSame('Capteur Un | Mapping Solutions', $document->evaluate('string(/html/head/title)'));
        $this->assertSame('Mesurez le paysage.', $document->evaluate('string(/html/head/meta[@name="description"]/@content)'));
        $entity = collect($this->graph($document))->firstWhere('@type', 'Product');
        $this->assertSame('Acme', $entity['brand']['name']);
        $this->assertArrayNotHasKey('offers', $entity);
        $this->assertArrayNotHasKey('aggregateRating', $entity);
        $response = $this->get('/news/'.$article->slug.'?lang=ar')->assertOk();
        $entity = collect($this->graph($this->document($response->getContent())))->firstWhere('@type', 'Article');
        $this->assertSame('جهاز جديد', $entity['headline']);
        $this->assertSame($article->created_at->toAtomString(), $entity['datePublished']);
    }

    public function test_inertia_navigation_receives_complete_metadata_when_changing_page_families(): void
    {
        $this->actingAs(User::factory()->create());
        $this->withHeaders(['X-Inertia' => 'true', 'X-Inertia-Version' => app(HandleInertiaRequests::class)->version(request())])->get('/contact?lang=ar')->assertOk()
            ->assertJsonPath('props.seo.canonical', 'https://canonical.example/contact?lang=ar')
            ->assertJsonPath('props.seo.robots', 'index, follow, max-image-preview:large');
        $this->get('/v1/dashboard')->assertOk()
            ->assertJsonPath('props.seo.robots', 'noindex, nofollow')
            ->assertJsonPath('props.seo.canonical', null)
            ->assertJsonPath('props.seo.alternates', [])
            ->assertJsonPath('props.seo.structuredData', []);
        $this->get('/about?lang=fr')->assertOk()
            ->assertJsonPath('props.seo.canonical', 'https://canonical.example/about?lang=fr');
    }

    public function test_invalid_detail_pages_are_real_404s_and_never_indexable(): void
    {
        $supplier = Supplier::factory()->create(['logo' => null]);
        foreach (['/products/missing', '/news/missing', '/vacancy/missing', '/products/product-technologies/missing', '/products/product-technologies/missing/suppliers/'.$supplier->slug] as $path) {
            $this->get($path)->assertNotFound()->assertHeader('X-Robots-Tag', 'noindex, nofollow');
        }
        $technology = ProductTechnology::factory()->create(['icon' => null]);
        $this->get('/products/product-technologies/'.$technology->slug.'/suppliers/'.$supplier->slug)->assertNotFound();
        $expired = Vacancy::factory()->create(['closing_date' => today()->subDay()]);
        $this->get('/vacancy/'.$expired->slug)->assertNotFound();
    }

    public function test_metadata_and_json_ld_are_safe_and_missing_translations_fall_back_to_english(): void
    {
        $article = NewsArticle::factory()->create([
            'title'      => json_encode(['en' => 'Sensor "A" </script><script>alert(1)</script>']),
            'excerpt'    => json_encode(['en' => '<p>Safe &amp; accurate measurements.</p>']),
            'hero_image' => null,
        ]);
        $response = $this->get('/news/'.$article->slug.'?lang=fr')->assertOk();
        $document = $this->document($response->getContent());
        $this->assertSame('Sensor "A" alert(1) | Mapping Solutions', $document->evaluate('string(/html/head/title)'));
        $this->assertSame('Safe & accurate measurements.', $document->evaluate('string(/html/head/meta[@name="description"]/@content)'));
        $this->assertCount(5, $this->graph($document));
        $response->assertDontSee('</script><script>alert(1)</script>', false);
        $article->update(['title' => json_encode(['en' => 'Sensor &lt;/script&gt;&lt;script&gt;alert(1)&lt;/script&gt;'])]);
        $response = $this->get('/news/'.$article->slug.'?lang=en')->assertOk();
        $this->assertSame('Sensor alert(1) | Mapping Solutions', $this->document($response->getContent())->evaluate('string(/html/head/title)'));
        $this->graph($this->document($response->getContent()));
        $response->assertDontSee('Sensor </script><script>alert(1)</script>', false);
    }

    public function test_news_pagination_keeps_its_canonical_and_language_and_has_navigable_links(): void
    {
        NewsArticle::factory()->count(11)->create(['hero_image' => null]);
        $response = $this->get('/news?lang=fr&page=2&utm_source=test')->assertOk();
        $document = $this->document($response->getContent());
        $this->assertSame('https://canonical.example/news?lang=fr&page=2', $document->evaluate('string(/html/head/link[@rel="canonical"]/@href)'));
        $this->assertSame('Actualités et perspectives — Page 2 | Mapping Solutions', $document->evaluate('string(/html/head/title)'));
        $this->assertSame('https://canonical.example/news?lang=ar&page=2', $document->evaluate('string(/html/head/link[@hreflang="ar"]/@href)'));
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->where('newsPagination.next', null)
            ->where('newsPagination.previous', fn (string $url): bool => str_contains($url, 'lang=fr') && str_contains($url, 'page=1')));
        $this->get('/news?page=3')->assertNotFound()->assertHeader('X-Robots-Tag', 'noindex, nofollow');
    }
}
