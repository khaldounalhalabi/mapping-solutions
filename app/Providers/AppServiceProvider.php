<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('public-forms', function (Request $request): array {
            return [
                Limit::perMinute(5)->by('form:'.$request->route()->getName().'|'.$request->ip()),
                Limit::perHour(30)->by('public:'.$request->ip()),
            ];
        });
    }

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }
}
