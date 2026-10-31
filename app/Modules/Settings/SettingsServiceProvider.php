<?php

namespace App\Modules\Settings;

use Illuminate\Support\ServiceProvider;

class SettingsServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->loadMigrationsFrom([
            app_path('Modules/Settings/database/migrations'),
        ]);
    }

    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }
}
