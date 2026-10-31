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
                'en' => '<p>Privacy Policy</p>',
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
                'en' => '<p>Terms And Conditions</p>',
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
            'value'       => "https://linkedin.com",
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
            'value'       => "https://facebook.com",
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
            'value'       => "https://instagram.com",
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
            'value'       => "https://youtube.com",
            'description' => Translatable::create([
                'en' => 'Official YouTube channel URL.',
            ]),
        ]);
    }
}
