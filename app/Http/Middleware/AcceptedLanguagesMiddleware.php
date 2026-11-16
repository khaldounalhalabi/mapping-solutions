<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;

class AcceptedLanguagesMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): mixed
    {

        $availableLocales = config('cubeta-starter.available_locales');
        $route = $request->route();
        $locale = $route?->parameter('locale');

        if (! is_string($locale) || ! in_array($locale, $availableLocales, true)) {
            $locale = $request->session()->get('locale');
        }

        if (! in_array($locale, $availableLocales, true)) {
            $locale = $request->cookie('locale');
        }

        if (! in_array($locale, $availableLocales, true)) {
            $locale = $request->getPreferredLanguage($availableLocales)
                ?? config('cubeta-starter.default_locale');
        }

        App::setLocale($locale);
        URL::defaults(['locale' => $locale]);
        $request->session()->put('locale', $locale);

        if (str_starts_with($route?->getName() ?? '', 'unlocalized.')) {
            $routeParameters = array_intersect_key($route->parameters(), array_flip($route->parameterNames()));
            $parameters = [...$request->query->all(), ...$routeParameters, 'locale' => $locale];
            $status = $request->isMethod('GET') || $request->isMethod('HEAD') ? 302 : 307;

            return redirect()->route(substr($route->getName(), strlen('unlocalized.')), $parameters, $status)
                ->header('Cache-Control', 'private, no-store');
        }

        $route?->forgetParameter('locale');

        return $next($request);
    }
}
