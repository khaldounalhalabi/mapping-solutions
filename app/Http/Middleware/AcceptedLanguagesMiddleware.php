<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class AcceptedLanguagesMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): mixed
    {

        $availableLocales = config('cubeta-starter.available_locales');
        $locale = $request->session()->get('locale');

        if (! in_array($locale, $availableLocales, true)) {
            $locale = $request->cookie('locale');
        }

        if (! in_array($locale, $availableLocales, true)) {
            $locale = $request->getPreferredLanguage($availableLocales)
                ?? config('cubeta-starter.default_locale');
        }

        App::setLocale($locale);

        return $next($request);
    }
}
