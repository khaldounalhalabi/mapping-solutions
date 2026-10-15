<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\NewsArticleResource;
use App\Services\v1\NewsArticle\NewsArticleService;
use App\DTOs\v1\NewsArticle\StoreUpdateNewsArticleDTO;

class NewsArticleController extends WebController
{
    private NewsArticleService $newsArticleService;

    public function __construct()
    {
        $this->newsArticleService = NewsArticleService::make();
        // place the relations you want to return them within the response
        $this->relations = ['newsCategory'];
    }

    public function create()
    {
        return Inertia::render('dashboard/news-articles/create');
    }

    public function data()
    {
        $items = $this->newsArticleService->indexWithPagination($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy($newsArticleId)
    {
        $result = $this->newsArticleService->delete($newsArticleId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function edit($newsArticleId)
    {
        $newsArticle = $this->newsArticleService->view($newsArticleId, $this->relations);

        if (! $newsArticle) {
            abort(404);
        }

        return Inertia::render('dashboard/news-articles/edit', [
            'newsArticle' => NewsArticleResource::make($newsArticle),
        ]);
    }

    public function index()
    {
        return Inertia::render('dashboard/news-articles/index');
    }

    public function show($newsArticleId)
    {
        $newsArticle = $this->newsArticleService->view($newsArticleId, $this->relations);

        return Inertia::render('dashboard/news-articles/show', [
            'newsArticle' => NewsArticleResource::make($newsArticle),
        ]);
    }

    public function store(StoreUpdateNewsArticleDTO $dto)
    {
        $newsArticle = $this->newsArticleService->store($dto->toArray(), $this->relations);
        if ($newsArticle) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.news.articles.index');
        }

        return Inertia::flash([
            'success' => trans('site.something_went_wrong'),
        ])->back();
    }

    public function update(StoreUpdateNewsArticleDTO $dto, $newsArticleId)
    {
        $newsArticle = $this->newsArticleService->update($dto->toArray(), $newsArticleId, $this->relations);
        if ($newsArticle) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.news.articles.index');
        }

        return Inertia::flash([
            'error' => trans('site.there_is_no_data'),
        ])->back();
    }
}
