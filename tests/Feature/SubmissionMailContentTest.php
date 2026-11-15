<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Inquiry;
use App\Models\Product;
use App\Models\Vacancy;
use App\Models\JobApplication;
use App\Mail\NewInquiryMessage;
use App\Mail\NewJobApplicationMessage;
use PHPUnit\Framework\Attributes\TestWith;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

class SubmissionMailContentTest extends TestCase
{
    use LazilyRefreshDatabase;

    public function test_application_email_includes_every_submitted_field_in_html_and_text(): void
    {
        $vacancy = Vacancy::factory()->create(['title' => ['en' => 'Survey engineer']]);
        $application = JobApplication::factory()->for($vacancy)->create([
            'first_name'             => 'Sam', 'last_name' => 'Jones', 'email' => 'sam@example.com',
            'phone'                  => '+442079460456', 'referral_source' => 'LinkedIn',
            'eligible_to_work_in_uk' => false, 'notice_period' => '1 Month', 'gdpr_consent' => true,
            'cover_letter'           => "I would like to apply.\nThank you for considering me.",
            'relevant_experience'    => 'Five years of survey experience.',
            'linkedin_url'           => 'https://www.linkedin.com/in/sam-jones',
            'created_at'             => '2026-11-15 14:45:00',
        ]);
        $mail = new NewJobApplicationMessage($application);

        foreach (['Sam', 'Jones', 'sam@example.com', '+442079460456', 'LinkedIn', 'Survey engineer', '1 Month', 'Yes', 'No', 'I would like to apply.', 'Thank you for considering me.', 'Five years of survey experience.', 'https://www.linkedin.com/in/sam-jones', '2026-11-15 14:45'] as $value) {
            $mail->assertSeeInHtml($value);
            $mail->assertSeeInText($value);
        }
        $mail->assertSeeInHtml('#'.$application->id);
        $mail->assertHasReplyTo('sam@example.com', 'Sam Jones');
    }

    public function test_inquiry_email_includes_every_submitted_field_in_html_and_text(): void
    {
        $product = Product::factory()->create(['name' => ['en' => 'Survey scanner']]);
        $inquiry = Inquiry::factory()->for($product)->create([
            'first_name' => 'Alex', 'last_name' => 'Smith', 'email' => 'alex@example.com',
            'phone'      => '+442079460123', 'company' => 'Example & Co', 'country' => 'United Kingdom',
            'subject'    => 'Product enquiry', 'message' => "Please send a quote.\nInclude delivery costs.",
            'created_at' => '2026-11-15 12:30:00',
        ]);
        $mail = new NewInquiryMessage($inquiry);

        foreach (['Alex', 'Smith', 'alex@example.com', '+442079460123', 'Example & Co', 'United Kingdom', 'Survey scanner', 'Product enquiry', 'Please send a quote.', 'Include delivery costs.', '2026-11-15 12:30'] as $value) {
            $mail->assertSeeInHtml($value);
            $mail->assertSeeInText($value);
        }
        $mail->assertSeeInHtml('#'.$inquiry->id);
        $mail->assertHasReplyTo('alex@example.com', 'Alex Smith');
    }

    public function test_inquiry_without_a_product_shows_an_explicit_empty_value(): void
    {
        $inquiry = Inquiry::factory()->make(['id' => 18, 'product_id' => null]);
        $mail = new NewInquiryMessage($inquiry);

        $mail->assertSeeInHtml('Not provided');
        $mail->assertSeeInText('Not provided');
    }

    #[TestWith(['en', 'Not provided', 'No', 'ltr'])]
    #[TestWith(['ar', 'غير مذكور', 'لا', 'rtl'])]
    #[TestWith(['fr', 'Non renseigné', 'Non', 'ltr'])]
    public function test_optional_fields_and_boolean_values_render_in_the_email_locale(string $locale, string $missing, string $no, string $direction): void
    {
        config(['cubeta-starter.default_locale' => $locale]);
        $application = JobApplication::factory()->make([
            'id'                     => 17, 'vacancy_id' => null, 'referral_source' => null, 'notice_period' => null,
            'relevant_experience'    => null, 'linkedin_url' => null,
            'eligible_to_work_in_uk' => false, 'gdpr_consent' => false,
        ]);
        $mail = new NewJobApplicationMessage($application);

        $mail->assertSeeInHtml($missing);
        $mail->assertSeeInText($missing);
        $mail->assertSeeInHtml($no);
        $mail->assertSeeInText($no);
        $mail->assertSeeInHtml('dir="'.$direction.'"', false);
        $mail->assertDontSeeInHtml('site.mail.');
    }

    public function test_submitted_markup_is_escaped_and_line_breaks_are_preserved(): void
    {
        $inquiry = Inquiry::factory()->make([
            'id'      => 19, 'product_id' => null, 'company' => '<img src=x onerror=alert(1)>',
            'message' => "<script>alert(1)</script>\nSecond line & more",
        ]);
        $application = JobApplication::factory()->make([
            'id'                  => 20, 'vacancy_id' => null, 'cover_letter' => '<script>application()</script>',
            'relevant_experience' => '<img src=x onerror=alert(2)>',
        ]);
        $inquiryMail = new NewInquiryMessage($inquiry);
        $applicationMail = new NewJobApplicationMessage($application);

        $inquiryMail->assertSeeInHtml('&lt;script&gt;alert(1)&lt;/script&gt;<br />', false);
        $inquiryMail->assertSeeInHtml('&lt;img src=x onerror=alert(1)&gt;', false);
        $inquiryMail->assertDontSeeInHtml('<script>', false);
        $inquiryMail->assertSeeInText("<script>alert(1)</script>\nSecond line & more");
        $applicationMail->assertSeeInHtml('&lt;script&gt;application()&lt;/script&gt;', false);
        $applicationMail->assertSeeInHtml('&lt;img src=x onerror=alert(2)&gt;', false);
        $applicationMail->assertDontSeeInHtml('<script>', false);
    }
}
