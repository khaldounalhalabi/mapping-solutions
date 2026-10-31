<?php

namespace App\Modules\Settings\App\Enums;

use App\Modules\SharedModule\Traits\BaseEnum;

enum SettingKeyEnum: string
{
    use BaseEnum;

    case ADDRESS = 'address';
    case ADDRESS_GOOGLE_MAP_URL = 'address_google_map_url';
    case CONTACT_EMAIL = 'contact_email';
    case CONTACT_PHONE = 'contact_phone';
    case FACEBOOK_URL = 'facebook_url';
    case INSTAGRAM_URL = 'instagram_url';
    case LINKEDIN_URL = 'linkedin_url';
    case PRIVACY_POLICY = 'privacy_policy';
    case START_YEAR = 'start_year';
    case TERMS_AND_CONDITIONS = 'terms_and_conditions';
    case YOUTUBE_URL = 'youtube_url';
}
