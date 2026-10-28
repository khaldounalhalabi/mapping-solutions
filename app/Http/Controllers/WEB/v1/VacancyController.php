<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\VacancyResource;
use App\Services\v1\Vacancy\VacancyService;
use App\DTOs\v1\Vacancy\StoreUpdateVacancyDTO;

class VacancyController extends WebController
{
    private VacancyService $vacancyService;

    public function __construct()
    {
        $this->vacancyService = VacancyService::make();
        // place the relations you want to return them within the response
        $this->relations = [];
    }

    public function create()
    {
        return Inertia::render('dashboard/vacancies/create');
    }

    public function data()
    {
        $items = $this->vacancyService->paginate($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy($vacancyId)
    {
        $result = $this->vacancyService->delete($vacancyId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function edit($vacancyId)
    {
        $vacancy = $this->vacancyService->view($vacancyId, $this->relations);

        if (! $vacancy) {
            abort(404);
        }

        return Inertia::render('dashboard/vacancies/edit', [
            'vacancy' => VacancyResource::make($vacancy),
        ]);
    }

    public function index()
    {
        return Inertia::render('dashboard/vacancies/index');
    }

    public function show($vacancyId)
    {
        $vacancy = $this->vacancyService->view($vacancyId, $this->relations);

        return Inertia::render('dashboard/vacancies/show', [
            'vacancy' => VacancyResource::make($vacancy),
        ]);
    }

    public function store(StoreUpdateVacancyDTO $dto)
    {
        $vacancy = $this->vacancyService->store($dto->toArray(), $this->relations);
        if ($vacancy) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.vacancies.index');
        }

        return Inertia::flash([
            'success' => trans('site.something_went_wrong'),
        ])->back();
    }

    public function update(StoreUpdateVacancyDTO $dto, $vacancyId)
    {
        $vacancy = $this->vacancyService->update($dto->toArray(), $vacancyId, $this->relations);
        if ($vacancy) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.vacancies.index');
        }

        return Inertia::flash([
            'error' => trans('site.there_is_no_data'),
        ])->back();
    }
}
