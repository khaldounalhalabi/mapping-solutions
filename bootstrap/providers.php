<?php

use App\Providers\AppServiceProvider;
use App\Providers\FakerServiceProvider;
use App\Modules\Settings\SettingsServiceProvider;

return [
    AppServiceProvider::class,
    FakerServiceProvider::class,
    SettingsServiceProvider::class,
];
