<?php

use Illuminate\Http\Request;
use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\SetSeoHeaders;
use Illuminate\Foundation\Application;
use App\Http\Middleware\HandleInertiaRequests;
use App\Modules\Sitemap\GenerateSitemapCommand;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\AcceptedLanguagesMiddleware;
use Illuminate\Routing\Middleware\SubstituteBindings;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {

            foreach (['unlocalized.' => '', '' => '{locale}'] as $name => $prefix) {
                Route::middleware(['web'])
                    ->name($name)
                    ->prefix($prefix)
                    ->where(['locale' => implode('|', array_map(fn (string $locale): string => preg_quote($locale, '/'), config('cubeta-starter.available_locales')))])
                    ->group(function () {
                        Route::group([], base_path('routes/v1/web/public.php'));
                        Route::middleware(['authenticated:web'])
                            ->group(base_path('routes/v1/web/protected.php'));
                    });
            }

        },
    )
    ->withCommands([GenerateSitemapCommand::class])
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->append(SetSeoHeaders::class);

        $middleware->trustProxies(at: '*');

        $middleware->alias([
            'authenticated' => Authenticate::class,
            'locale'        => AcceptedLanguagesMiddleware::class,
        ]);

        $middleware->prependToPriorityList(
            before: SubstituteBindings::class,
            prepend: AcceptedLanguagesMiddleware::class,
        );

        $middleware->web(append: [
            AcceptedLanguagesMiddleware::class,
            HandleInertiaRequests::class,
        ]);
    })->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
    })->create();
