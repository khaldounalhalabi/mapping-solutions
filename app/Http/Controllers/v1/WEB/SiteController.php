<?php

namespace App\Http\Controllers\v1\WEB;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\ProductFamilyResource;
use App\Services\v1\ProductFamily\ProductFamilyService;

class SiteController extends WebController
{
    public function index()
    {
        $productFamilies = ProductFamilyService::make()->index();

        return Inertia::render('site/index', [
            'families' => ProductFamilyResource::collection($productFamilies),
        ]);
    }
}
