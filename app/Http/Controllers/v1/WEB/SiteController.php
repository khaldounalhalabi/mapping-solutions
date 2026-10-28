<?php

namespace App\Http\Controllers\v1\WEB;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\WebController;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Resources\v1\SupplierResource;
use App\Services\v1\Supplier\SupplierService;
use App\Http\Resources\v1\NewsArticleResource;
use App\Services\v1\NewsArticle\NewsArticleService;
use App\Http\Resources\v1\MarketApplicationResource;
use App\Http\Resources\v1\ProductTechnologyResource;
use App\Services\v1\MarketApplication\MarketApplicationService;
use App\Services\v1\ProductTechnology\ProductTechnologyService;

class SiteController extends WebController
{
    public function index()
    {
        $technologies = ProductTechnologyService::make()->index([], [
            'suppliers' => static fn (Builder $query): Builder => $query->select(
                DB::raw('COUNT(DISTINCT suppliers.id)'),
            ),
            'products',
        ]);
        $applications = MarketApplicationService::make()->featured();
        $news = NewsArticleService::make()->recent();
        $suppliers = SupplierService::make()->index();

        return Inertia::render('site/index', [
            'technologies' => ProductTechnologyResource::collection($technologies),
            'applications' => MarketApplicationResource::collection($applications),
            'news'         => NewsArticleResource::collection($news),
            'suppliers'    => SupplierResource::collection($suppliers),
        ]);
    }

    public function products()
    {
        $technologies = ProductTechnologyService::make()->index([], [
            'suppliers' => static fn (Builder $query): Builder => $query->select(
                DB::raw('COUNT(DISTINCT suppliers.id)'),
            ),
            'products',
        ]);

        return Inertia::render('site/products/index', [
            'technologies' => ProductTechnologyResource::collection($technologies),
        ]);
    }
}
