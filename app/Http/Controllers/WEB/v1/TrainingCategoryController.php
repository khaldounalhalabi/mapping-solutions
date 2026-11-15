<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\TrainingCategoryResource;
use App\Services\v1\TrainingCategory\TrainingCategoryService;
use App\DTOs\v1\TrainingCategory\StoreUpdateTrainingCategoryDTO;

class TrainingCategoryController extends WebController
{
    private TrainingCategoryService $trainingCategoryService;

    public function __construct()
    {
        $this->trainingCategoryService = TrainingCategoryService::make();
        $this->relations = [];
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/training-categories/create');
    }

    public function data(): JsonResponse
    {
        $items = $this->trainingCategoryService->paginate($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy(int $trainingCategoryId): JsonResponse
    {
        $result = $this->trainingCategoryService->delete($trainingCategoryId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function edit(int $trainingCategoryId): Response
    {
        $trainingCategory = $this->trainingCategoryService->view($trainingCategoryId, $this->relations);

        if (! $trainingCategory) {
            abort(404);
        }

        return Inertia::render('dashboard/training-categories/edit', [
            'trainingCategory' => TrainingCategoryResource::make($trainingCategory),
        ]);
    }

    public function index(): Response
    {
        return Inertia::render('dashboard/training-categories/index');
    }

    public function show(int $trainingCategoryId): Response
    {
        $trainingCategory = $this->trainingCategoryService->view($trainingCategoryId, $this->relations);

        abort_unless($trainingCategory, 404);

        return Inertia::render('dashboard/training-categories/show', [
            'trainingCategory' => TrainingCategoryResource::make($trainingCategory),
        ]);
    }

    public function store(StoreUpdateTrainingCategoryDTO $dto): RedirectResponse
    {
        $trainingCategory = $this->trainingCategoryService->store($dto->toArray(), $this->relations);
        if ($trainingCategory) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.training.categories.index');
        }

        return Inertia::flash([
            'error' => trans('site.something_went_wrong'),
        ])->back();
    }

    public function update(StoreUpdateTrainingCategoryDTO $dto, int $trainingCategoryId): RedirectResponse
    {
        abort_unless($this->trainingCategoryService->view($trainingCategoryId), 404);

        $trainingCategory = $this->trainingCategoryService->update($dto->toArray(), $trainingCategoryId, $this->relations);
        if ($trainingCategory) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.training.categories.index');
        }

        return Inertia::flash([
            'error' => trans('site.there_is_no_data'),
        ])->back();
    }
}
