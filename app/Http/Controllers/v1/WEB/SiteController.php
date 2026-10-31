<?php

namespace App\Http\Controllers\v1\WEB;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\ProductRange;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\WebController;
use App\DTOs\v1\Inquiry\StoreInquiryDTO;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Resources\v1\VacancyResource;
use App\Http\Resources\v1\SupplierResource;
use App\Services\v1\Inquiry\InquiryService;
use App\Services\v1\Vacancy\VacancyService;
use App\Services\v1\Supplier\SupplierService;
use App\Http\Resources\v1\NewsArticleResource;
use App\Http\Resources\v1\ProductRangeResource;
use App\Http\Resources\v1\ServiceCategoryResource;
use App\Services\v1\NewsArticle\NewsArticleService;
use App\Http\Resources\v1\MarketApplicationResource;
use App\Http\Resources\v1\ProductTechnologyResource;
use App\DTOs\v1\JobApplication\StoreJobApplicationDTO;
use App\Services\v1\JobApplication\JobApplicationService;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use App\Services\v1\ServiceCategory\ServiceCategoryService;
use App\Services\v1\MarketApplication\MarketApplicationService;
use App\Services\v1\ProductTechnology\ProductTechnologyService;

class SiteController extends WebController
{
    public function about(): Response
    {
        return Inertia::render('site/about/index', [
            'suppliers' => SupplierResource::collection(SupplierService::make()->index()),
            'ranges'    => ProductRangeResource::collection(ProductRange::query()->orderBy('sort_order')->orderBy('id')->get()),
        ]);
    }

    public function applications(): Response
    {
        return Inertia::render('site/applications/index', [
            'applications' => MarketApplicationResource::collection(MarketApplicationService::make()->visible()),
        ]);
    }

    public function careers(): Response
    {
        return Inertia::render('site/careers/index', [
            'vacancies' => VacancyResource::collection(VacancyService::make()->current()),
            'today'     => today()->toDateString(),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('site/contact/index');
    }

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

    public function newsArticles()
    {
        $articles = NewsArticleService::make()->index();

        return Inertia::render('site/news/index', [
            'articles' => NewsArticleResource::collection($articles),
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

//    TODO: move it to it controller
    public function storeInquiry(StoreInquiryDTO $dto): RedirectResponse
    {
        InquiryService::make()->store($dto->toArray());
        Inertia::flash('success', trans('site.inquiry_received'));

        return back();
    }

    //    TODO: move it to it controller
    public function storeJobApplication(StoreJobApplicationDTO $dto): RedirectResponse
    {
        JobApplicationService::make()->store($dto->toArray());
        Inertia::flash('success', trans('site.application_received'));

        return back();
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

    public function vacancy(string $slug): Response
    {
        $vacancy = VacancyService::make()->currentBySlug($slug);
        abort_unless($vacancy, 404);

        return Inertia::render('site/careers/show', [
            'vacancy' => VacancyResource::make($vacancy),
        ]);
    }
}
