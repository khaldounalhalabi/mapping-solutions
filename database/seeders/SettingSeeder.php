<?php

namespace Database\Seeders;

use Exception;
use Illuminate\Database\Seeder;
use App\Serializers\Translatable;
use App\Modules\Settings\App\Models\Setting;
use App\Modules\Settings\App\Enums\SettingKeyEnum;
use App\Modules\Settings\App\Enums\SettingTypeEnum;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @throws Exception
     */
    public function run(): void
    {
        Setting::create([
            'structure' => [
                'value_type' => SettingTypeEnum::PHONE->value,
            ],
            'key'   => SettingKeyEnum::CONTACT_PHONE->value,
            'label' => Translatable::create([
                'en' => 'Contact Phone',
            ]),
            'value'       => '+44 8251 99303',
            'description' => Translatable::create([
                'en' => 'The phone appears in the website which represent the contact phone number, it must be with country code',
            ]),
        ]);

        Setting::create([
            'structure' => [
                'value_type' => SettingTypeEnum::STRING->value,
            ],
            'key'   => SettingKeyEnum::CONTACT_EMAIL->value,
            'label' => Translatable::create([
                'en' => 'Contact Email',
            ]),
            'value'       => 'info@mapping-solutions.co.uk',
            'description' => Translatable::create([
                'en' => 'The email appears in the website which represent the contact phone number',
            ]),
        ]);

        Setting::create([
            'structure' => [
                'value_type' => SettingTypeEnum::STRING->value,
            ],
            'key'   => SettingKeyEnum::ADDRESS->value,
            'label' => Translatable::create([
                'en' => 'Address',
            ]),
            'value'       => '69 Hamilton Road, Manchester,M13 0PD, UK',
            'description' => Translatable::create([
                'en' => 'The company address appears in the website',
            ]),
        ]);

        Setting::create([
            'structure' => [
                'value_type' => SettingTypeEnum::NUMERIC->value,
            ],
            'key'   => SettingKeyEnum::START_YEAR->value,
            'label' => Translatable::create([
                'en' => 'Start Year',
            ]),
            'value'       => 2004,
            'description' => Translatable::create([
                'en' => 'The year which of the company has started, this is used to calculate how many years the company has been in the market',
            ]),
        ]);

        Setting::create([
            'structure' => [
                'value_type' => SettingTypeEnum::TRANSLATABLE_HTML_TEXT->value,
            ],
            'key'   => SettingKeyEnum::PRIVACY_POLICY->value,
            'label' => Translatable::create([
                'en' => 'Privacy Policy',
            ]),
            'value' => Translatable::create([
                'en' => <<<'HTML'
                    <p><strong>Demo policy — for demonstration purposes only.</strong> This sample describes example practices and must be reviewed against actual business operations before publication.</p>
                    <h2>1. About this policy</h2>
                    <p>Mapping Solutions provides specialist measurement instruments, mapping technology and survey services. This policy explains how personal information may be handled when you browse our website, contact our team, subscribe to updates or apply for a role.</p>
                    <h2>2. Information we collect</h2>
                    <ul>
                    <li>Contact details, such as your name, email address, telephone number, company and country.</li>
                    <li>Information you provide in enquiries, including your measurement requirements and correspondence with our team.</li>
                    <li>Newsletter subscription details and communication preferences.</li>
                    <li>Recruitment information, such as your work experience, application details and documents you choose to send us.</li>
                    <li>Technical information needed to operate the website, such as IP addresses, browser details and security logs.</li>
                    </ul>
                    <h2>3. How we use your information</h2>
                    <p>We use information to respond to enquiries, discuss suitable instruments and services, manage customer relationships, consider job applications and keep the website reliable and secure. Where you subscribe, we may also send company news and product updates.</p>
                    <h2>4. Reasons for processing</h2>
                    <p>Depending on the activity, processing may be necessary to respond to a request before entering a contract, deliver an agreed service, meet a legal obligation or pursue a legitimate business interest. Where processing relies on consent, you may withdraw that consent without affecting earlier processing.</p>
                    <h2>5. Sharing information</h2>
                    <p>Information may be shared with service providers supporting our website, communications and business administration. When needed to answer an enquiry or deliver a service, relevant details may also be shared with specialist manufacturers or delivery partners. We aim to share only the information needed for the task. This demo assumes that personal information is not sold.</p>
                    <h2>6. Cookies and website storage</h2>
                    <p>The website may use cookies or local storage for essential functionality, security and preferences. Any optional analytics or marketing tools, and the choices available for them, should be described here before those tools are enabled.</p>
                    <h2>7. Retention and security</h2>
                    <p>We aim to retain information only for as long as needed for its purpose and any applicable record-keeping obligations. Appropriate access controls and technical safeguards help protect information, although no online system can guarantee complete security. Specific retention periods should be confirmed before this demo policy is published.</p>
                    <h2>8. International handling</h2>
                    <p>Some providers or manufacturers may operate in other countries. Where information is transferred internationally, the actual destinations and applicable safeguards should be confirmed and explained in the published policy.</p>
                    <h2>9. Your choices and requests</h2>
                    <p>You can unsubscribe from newsletters using the link in an email. You may also contact us to ask about accessing, correcting or deleting your information, restricting or objecting to its use, or receiving a portable copy where applicable. These requests may be subject to identity checks and applicable legal requirements. You may raise concerns with the relevant data protection authority.</p>
                    <h2>10. Contact and updates</h2>
                    <p>For privacy questions, email <a href="mailto:info@mapping-solutions.co.uk">info@mapping-solutions.co.uk</a>. We may update this policy as our services and practices change. Please check this page for the current version.</p>
                    HTML,
            ]),
            'description' => Translatable::create([
                'en' => 'Privacy Policy Page Content',
            ]),
        ]);

        Setting::create([
            'structure' => [
                'value_type' => SettingTypeEnum::TRANSLATABLE_HTML_TEXT->value,
            ],
            'key'   => SettingKeyEnum::TERMS_AND_CONDITIONS->value,
            'label' => Translatable::create([
                'en' => 'Terms And Conditions',
            ]),
            'value' => Translatable::create([
                'en' => <<<'HTML'
                    <p><strong>Demo terms — for demonstration purposes only.</strong> This sample must be reviewed and adapted to the business before publication or use in customer agreements.</p>
                    <h2>1. About these terms</h2>
                    <p>These sample terms cover use of the Mapping Solutions website, including its product catalogue, technical information, news and enquiry forms. By using the website, you agree to use it responsibly and in accordance with the terms published here.</p>
                    <h2>2. Website information</h2>
                    <p>Our website introduces specialist measurement instruments, mapping technologies and survey services. Product descriptions, specifications, images and availability are provided for general information and may change. Please confirm current specifications and suitability with our team before making a purchasing or operational decision.</p>
                    <h2>3. Enquiries, quotations and orders</h2>
                    <p>Submitting an enquiry does not place an order or create a supply agreement. Pricing, delivery, payment, installation, training, warranty and support arrangements should be confirmed in a separate written quotation or agreement. Any accepted agreement will set out the terms applying to the relevant products or services.</p>
                    <h2>4. Technical suitability and safe use</h2>
                    <p>Instrument selection depends on the intended application, operating environment and required performance. You are responsible for providing accurate requirements and following manufacturer instructions, training requirements and applicable operating rules. Website content is not a substitute for project-specific technical advice.</p>
                    <h2>5. Acceptable use</h2>
                    <ul>
                    <li>Use the website and its forms for lawful, relevant enquiries.</li>
                    <li>Provide accurate information and submit only material you are entitled to share.</li>
                    <li>Do not attempt unauthorised access, introduce malicious software or disrupt website availability.</li>
                    <li>Do not misuse contact forms or newsletter features to send spam or misleading communications.</li>
                    </ul>
                    <h2>6. Intellectual property</h2>
                    <p>Website text, design, logos, images and downloadable materials belong to Mapping Solutions or their respective owners. You may view content for information and internal evaluation. Any further reproduction, distribution or commercial use requires permission unless otherwise allowed by the relevant owner or applicable law. Manufacturer names and trademarks remain the property of their owners.</p>
                    <h2>7. Downloads and external links</h2>
                    <p>Datasheets and other downloads may be supplied by manufacturers and should be checked for the latest revision. Links to external websites are provided for convenience; their content, availability and privacy practices are controlled by their operators.</p>
                    <h2>8. Availability and limitations</h2>
                    <p>We aim to keep the website useful and available, but content may contain errors and access may be interrupted for maintenance or other reasons. The published terms should explain any applicable warranties and limitations of liability following legal review. Nothing in these demo terms is intended to exclude rights or liabilities that cannot lawfully be excluded.</p>
                    <h2>9. Privacy and communications</h2>
                    <p>Personal information submitted through the website is handled as described in our <a href="/privacy-policy">privacy policy</a>. Newsletter subscriptions are optional, and you can unsubscribe using the link in an email.</p>
                    <h2>10. Changes and questions</h2>
                    <p>We may revise website content and these terms as services evolve. Please review the current terms when using the website. Questions about the website, products or these terms can be sent to <a href="mailto:info@mapping-solutions.co.uk">info@mapping-solutions.co.uk</a>.</p>
                    HTML,
            ]),
            'description' => Translatable::create([
                'en' => 'Terms and conditions page content',
            ]),
        ]);

        Setting::create([
            'structure' => [
                'value_type' => SettingTypeEnum::URL->value,
            ],
            'key'   => SettingKeyEnum::ADDRESS_GOOGLE_MAP_URL->value,
            'label' => Translatable::create([
                'en' => 'Address Google Maps URL',
            ]),
            'value'       => 'https://www.google.com/maps/place/...',
            'description' => Translatable::create([
                'en' => 'Google Maps URL for the business location.',
            ]),
        ]);

        Setting::create([
            'structure' => [
                'value_type' => SettingTypeEnum::URL->value,
            ],
            'key'   => SettingKeyEnum::LINKEDIN_URL->value,
            'label' => Translatable::create([
                'en' => 'LinkedIn URL',
            ]),
            'value'       => 'https://linkedin.com',
            'description' => Translatable::create([
                'en' => 'Official LinkedIn profile or company page URL.',
            ]),
        ]);

        Setting::create([
            'structure' => [
                'value_type' => SettingTypeEnum::URL->value,
            ],
            'key'   => SettingKeyEnum::FACEBOOK_URL->value,
            'label' => Translatable::create([
                'en' => 'Facebook URL',
            ]),
            'value'       => 'https://facebook.com',
            'description' => Translatable::create([
                'en' => 'Official Facebook page URL.',
            ]),
        ]);

        Setting::create([
            'structure' => [
                'value_type' => SettingTypeEnum::URL->value,
            ],
            'key'   => SettingKeyEnum::INSTAGRAM_URL->value,
            'label' => Translatable::create([
                'en' => 'Instagram URL',
            ]),
            'value'       => 'https://instagram.com',
            'description' => Translatable::create([
                'en' => 'Official Instagram profile URL.',
            ]),
        ]);

        Setting::create([
            'structure' => [
                'value_type' => SettingTypeEnum::URL->value,
            ],
            'key'   => SettingKeyEnum::YOUTUBE_URL->value,
            'label' => Translatable::create([
                'en' => 'YouTube URL',
            ]),
            'value'       => 'https://youtube.com',
            'description' => Translatable::create([
                'en' => 'Official YouTube channel URL.',
            ]),
        ]);
    }
}
