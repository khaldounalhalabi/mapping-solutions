<?php

namespace App\Http\Controllers\v1\WEB;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\ProductTechnologyResource;
use App\Services\v1\ProductTechnology\ProductTechnologyService;

class SiteController extends WebController
{
    public function index()
    {
        $technologies = ProductTechnologyService::make()->index();

        return Inertia::render('site/index', [
            'technologies' => ProductTechnologyResource::collection($technologies),
        ]);
    }
}
