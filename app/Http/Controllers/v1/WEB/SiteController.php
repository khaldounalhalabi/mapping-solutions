<?php

namespace App\Http\Controllers\v1\WEB;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\WebController;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Resources\v1\SupplierResource;
use App\Services\v1\Supplier\SupplierService;
use App\Http\Resources\v1\NewsArticleResource;
use App\Http\Resources\v1\ServiceCategoryResource;
use App\Services\v1\NewsArticle\NewsArticleService;
use App\Http\Resources\v1\MarketApplicationResource;
use App\Http\Resources\v1\ProductTechnologyResource;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use App\Services\v1\ServiceCategory\ServiceCategoryService;
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

    public function services()
    {
        $categories = ServiceCategoryService::make()->index(['services']);

        return Inertia::render('site/services/index', [
            'categories' => ServiceCategoryResource::collection($categories),
        ]);
    }

    public function suppliers()
    {
        $technologies = ProductTechnologyService::make()->index(
            [
                'suppliers' => fn (Builder|HasManyThrough $query): Builder|HasManyThrough => $query->withCount('products'),
                'suppliers.productFamilies',
            ],
        );

        return Inertia::render('site/suppliers/index', [
            'technologies' => ProductTechnologyResource::collection($technologies),
        ]);
    }

    public function newsArticles()
    {
        $articles = NewsArticleService::make()->index();

        return Inertia::render('site/news/index', [
            'articles' => NewsArticleResource::collection($articles),
        ]);
    }
}
