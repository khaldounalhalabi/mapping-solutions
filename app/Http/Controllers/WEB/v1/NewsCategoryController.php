<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\NewsCategoryResource;
use App\Services\v1\NewsCategory\NewsCategoryService;
use App\DTOs\v1\NewsCategory\StoreUpdateNewsCategoryDTO;

class NewsCategoryController extends WebController
{
    private NewsCategoryService $newsCategoryService;

    public function __construct()
    {
        $this->newsCategoryService = NewsCategoryService::make();
        // place the relations you want to return them within the response
        $this->relations = [];
    }

    public function create()
    {
        return Inertia::render('dashboard/news-categories/create');
    }

    public function data()
    {
        $items = $this->newsCategoryService->paginate($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy($newsCategoryId)
    {
        $result = $this->newsCategoryService->delete($newsCategoryId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function edit($newsCategoryId)
    {
        $newsCategory = $this->newsCategoryService->view($newsCategoryId, $this->relations);

        if (! $newsCategory) {
            abort(404);
        }

        return Inertia::render('dashboard/news-categories/edit', [
            'newsCategory' => NewsCategoryResource::make($newsCategory),
        ]);
    }

    public function index()
    {
        return Inertia::render('dashboard/news-categories/index');
    }

    public function show($newsCategoryId)
    {
        $newsCategory = $this->newsCategoryService->view($newsCategoryId, $this->relations);

        return Inertia::render('dashboard/news-categories/show', [
            'newsCategory' => NewsCategoryResource::make($newsCategory),
        ]);
    }

    public function store(StoreUpdateNewsCategoryDTO $dto)
    {
        $newsCategory = $this->newsCategoryService->store($dto->toArray(), $this->relations);
        if ($newsCategory) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.news.categories.index');
        }

        return Inertia::flash([
            'success' => trans('site.something_went_wrong'),
        ])->back();
    }

    public function update(StoreUpdateNewsCategoryDTO $dto, $newsCategoryId)
    {
        $newsCategory = $this->newsCategoryService->update($dto->toArray(), $newsCategoryId, $this->relations);
        if ($newsCategory) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.news.categories.index');
        }

        return Inertia::flash([
            'error' => trans('site.there_is_no_data'),
        ])->back();
    }
}
