<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class RobotsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(): Response
    {
        return response("User-agent: *\nDisallow:\n\nSitemap: ".rtrim(config('app.url'), '/')."/sitemap.xml\n", 200, [
            'Content-Type' => 'text/plain; charset=UTF-8',
        ]);
    }
}
