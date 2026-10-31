<?php

namespace App\Modules\Settings\App;

class Config
{
    public static function idRouteParam(): string
    {
        return 'setting'; // this means that for update route we are using this /settings/{setting} url
        // when returning "settingId" then this means that the route is /settings/{settingId}
    }
}
