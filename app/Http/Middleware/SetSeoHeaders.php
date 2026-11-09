<?php

namespace App\Http\Middleware;

use Closure;
use App\Modules\Seo\PageSeo;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetSeoHeaders
{
    /** @param Closure(Request): Response $next */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (! app(PageSeo::class)->isIndexable($request) || ! $response->isSuccessful()) {
            $response->headers->set('X-Robots-Tag', 'noindex, nofollow');
        }

        return $response;
    }
}
