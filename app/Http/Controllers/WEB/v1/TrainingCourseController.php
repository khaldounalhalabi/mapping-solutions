<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\TrainingCourseResource;
use App\Services\v1\TrainingCourse\TrainingCourseService;
use App\DTOs\v1\TrainingCourse\StoreUpdateTrainingCourseDTO;

class TrainingCourseController extends WebController
{
    private TrainingCourseService $trainingCourseService;

    public function __construct()
    {
        $this->trainingCourseService = TrainingCourseService::make();
        $this->relations = ['trainingCategory'];
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/training-courses/create');
    }

    public function data(): JsonResponse
    {
        $items = $this->trainingCourseService->paginate($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy(int $trainingCourseId): JsonResponse
    {
        $result = $this->trainingCourseService->delete($trainingCourseId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function edit(int $trainingCourseId): Response
    {
        $trainingCourse = $this->trainingCourseService->view($trainingCourseId, $this->relations);

        if (! $trainingCourse) {
            abort(404);
        }

        return Inertia::render('dashboard/training-courses/edit', [
            'trainingCourse' => TrainingCourseResource::make($trainingCourse),
        ]);
    }

    public function index(): Response
    {
        return Inertia::render('dashboard/training-courses/index');
    }

    public function show(int $trainingCourseId): Response
    {
        $trainingCourse = $this->trainingCourseService->view($trainingCourseId, $this->relations);

        abort_unless($trainingCourse, 404);

        return Inertia::render('dashboard/training-courses/show', [
            'trainingCourse' => TrainingCourseResource::make($trainingCourse),
        ]);
    }

    public function store(StoreUpdateTrainingCourseDTO $dto): RedirectResponse
    {
        $trainingCourse = $this->trainingCourseService->store($dto->toArray(), $this->relations);
        if ($trainingCourse) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.training.courses.index');
        }

        return Inertia::flash([
            'error' => trans('site.something_went_wrong'),
        ])->back();
    }

    public function update(StoreUpdateTrainingCourseDTO $dto, int $trainingCourseId): RedirectResponse
    {
        abort_unless($this->trainingCourseService->view($trainingCourseId), 404);

        $trainingCourse = $this->trainingCourseService->update($dto->toArray(), $trainingCourseId, $this->relations);
        if ($trainingCourse) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.training.courses.index');
        }

        return Inertia::flash([
            'error' => trans('site.there_is_no_data'),
        ])->back();
    }
}
