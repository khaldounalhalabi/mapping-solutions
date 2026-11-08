<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Http\Request;
use App\Serializers\Translatable;
use App\Mail\ResetPasswordCodeEmail;
use App\Rules\ValidTranslatableJson;
use Inertia\Testing\AssertableInertia;
use Illuminate\Support\Facades\Validator;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\AcceptedLanguagesMiddleware;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

class LocalizationTest extends TestCase
{
    use LazilyRefreshDatabase;

    public function test_browser_language_is_used_and_invalid_session_cannot_set_an_unsupported_locale(): void
    {
        $request = Request::create('/');
        $request->headers->set('Accept-Language', 'fr-FR,fr;q=0.9,en;q=0.8');
        $request->setLaravelSession(app('session.store'));
        $request->session()->put('locale', 'unsupported');

        (new AcceptedLanguagesMiddleware)->handle($request, function () {
            $this->assertSame('fr', app()->getLocale());

            return response('ok');
        });
    }

    public function test_content_validation_accepts_supported_languages_and_rejects_invalid_shapes(): void
    {
        foreach (['{"en":"English","ar":"العربية","fr":"Français"}' => true, '{"de":"Deutsch"}' => false, '{"en":{"nested":"value"}}' => false, 'invalid' => false] as $value => $valid) {
            $validator = Validator::make(['content' => $value], ['content' => [new ValidTranslatableJson]]);
            $this->assertSame($valid, $validator->passes());
        }
    }

    public function test_dashboard_and_json_requests_use_the_same_session_language(): void
    {
        $this->actingAs(User::factory()->create());

        foreach (['en', 'ar', 'fr'] as $locale) {
            $this->withSession(['locale' => $locale])
                ->get(route('v1.web.protected.index'))
                ->assertOk()
                ->assertInertia(fn (AssertableInertia $page) => $page->where('currentLocale', $locale));

            $this->getJson(route('v1.web.protected.suppliers.data'))->assertOk();
            $this->assertSame($locale, app()->getLocale());
        }
    }

    public function test_explicit_choice_overrides_browser_language(): void
    {
        $request = Request::create('/');
        $request->headers->set('Accept-Language', 'fr');
        $request->setLaravelSession(app('session.store'));
        $request->session()->put('locale', 'ar');

        (new AcceptedLanguagesMiddleware)->handle($request, function () {
            $this->assertSame('ar', app()->getLocale());

            return response('ok');
        });
    }

    public function test_explicit_url_language_overrides_session_cookie_and_browser_preferences(): void
    {
        $this->withSession(['locale' => 'en'])
            ->withCookie('locale', 'fr')
            ->withHeader('Accept-Language', 'en')
            ->get('/?lang=ar')
            ->assertOk()
            ->assertSee('lang="ar"', false)
            ->assertSee('dir="rtl"', false)
            ->assertInertia(fn (AssertableInertia $page) => $page->where('currentLocale', 'ar'))
            ->assertSessionHas('locale', 'en');
    }

    public function test_invalid_url_language_preserves_the_session_preference(): void
    {
        foreach (['de', '', ['ar']] as $lang) {
            $this->withSession(['locale' => 'fr'])
                ->get('/?'.http_build_query(['lang' => $lang]))
                ->assertOk()
                ->assertInertia(fn (AssertableInertia $page) => $page->where('currentLocale', 'fr'));
        }
    }

    public function test_language_choice_is_saved_in_session_and_cookie(): void
    {
        $this->withoutMiddleware(HandleInertiaRequests::class);

        $this->postJson(route('set-locale'), ['lang' => 'fr'])
            ->assertOk()
            ->assertSessionHas('locale', 'fr')
            ->assertCookie('locale', 'fr');
    }

    public function test_language_cookie_is_used_without_a_session_choice(): void
    {
        $this->withCookie('locale', 'ar')->get('/')
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page->where('currentLocale', 'ar'));
    }

    public function test_public_pages_share_the_resolved_language_and_html_direction(): void
    {
        foreach (['en', 'ar', 'fr'] as $locale) {
            $this->withSession(['locale' => $locale])->get('/')
                ->assertOk()
                ->assertSee('lang="'.$locale.'"', false)
                ->assertSee('dir="'.($locale === 'ar' ? 'rtl' : 'ltr').'"', false)
                ->assertInertia(fn (AssertableInertia $page) => $page
                    ->where('currentLocale', $locale)
                    ->where('availableLocales', ['en', 'ar', 'fr']));
        }
    }

    public function test_reset_email_keeps_its_language_when_rendered_later(): void
    {
        app()->setLocale('ar');
        $mail = new ResetPasswordCodeEmail('123456', 'person@example.com');
        app()->setLocale('en');

        $html = $mail->render();

        $this->assertStringContainsString('رمز إعادة تعيين كلمة المرور هو:', $html);
        $this->assertStringContainsString('dir="rtl"', $html);
        $this->assertStringContainsString('123456', $html);
        $this->assertSame('en', app()->getLocale());
    }

    public function test_translated_content_preserves_all_languages_and_falls_back_to_english(): void
    {
        $content = new Translatable(['en' => 'English', 'ar' => 'العربية', 'fr' => 'Français']);
        $content->ar = 'جديد';

        $this->assertSame('English', $content->en);
        $this->assertSame('Français', $content->fr);
        $this->assertSame('جديد', $content->translate('ar'));
        $this->assertSame('Legacy', (new Translatable('Legacy'))->translate('fr'));
    }

    public function test_unsupported_browser_languages_fall_back_to_english(): void
    {
        $this->withHeader('Accept-Language', 'de-DE,de;q=0.9')
            ->get('/')
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page->where('currentLocale', 'en'));
    }

    public function test_unsupported_language_is_rejected(): void
    {
        $this->withoutMiddleware(HandleInertiaRequests::class);

        $this->postJson(route('set-locale'), ['lang' => 'de'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('lang');
    }

    public function test_validation_errors_use_the_selected_language(): void
    {
        $this->withSession(['locale' => 'fr'])->postJson(route('set-locale'), [])
            ->assertUnprocessable()
            ->assertJsonPath('errors.lang.0', 'Le champ langue est obligatoire.');
    }
}
