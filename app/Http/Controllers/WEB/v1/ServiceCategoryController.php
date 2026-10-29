<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\ServiceCategoryResource;
use App\Services\v1\ServiceCategory\ServiceCategoryService;
use App\DTOs\v1\ServiceCategory\StoreUpdateServiceCategoryDTO;

class ServiceCategoryController extends WebController
{
    private ServiceCategoryService $serviceCategoryService;

    public function __construct()
    {
        $this->serviceCategoryService = ServiceCategoryService::make();
        // place the relations you want to return them within the response
        $this->relations = ['services'];
    }

    public function create()
    {
        return Inertia::render('dashboard/service-categories/create');
    }

    public function data()
    {
        $items = $this->serviceCategoryService->paginate();

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy($serviceCategoryId)
    {
        $result = $this->serviceCategoryService->delete($serviceCategoryId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function edit($serviceCategoryId)
    {
        $serviceCategory = $this->serviceCategoryService->view($serviceCategoryId, $this->relations);

        if (! $serviceCategory) {
            abort(404);
        }

        return Inertia::render('dashboard/service-categories/edit', [
            'serviceCategory' => ServiceCategoryResource::make($serviceCategory),
        ]);
    }

    public function index()
    {
        return Inertia::render('dashboard/service-categories/index');
    }

    public function show($serviceCategoryId)
    {
        $serviceCategory = $this->serviceCategoryService->view($serviceCategoryId, $this->relations);

        return Inertia::render('dashboard/service-categories/show', [
            'serviceCategory' => ServiceCategoryResource::make($serviceCategory),
        ]);
    }

    public function store(StoreUpdateServiceCategoryDTO $dto)
    {
        $serviceCategory = $this->serviceCategoryService->store($dto->toArray(), $this->relations);
        if ($serviceCategory) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.service.categories.index');
        }

        return Inertia::flash([
            'success' => trans('site.something_went_wrong'),
        ])->back();
    }

    public function update(StoreUpdateServiceCategoryDTO $dto, $serviceCategoryId)
    {
        $serviceCategory = $this->serviceCategoryService->update($dto->toArray(), $serviceCategoryId, $this->relations);
        if ($serviceCategory) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.service.categories.index');
        }

        return Inertia::flash([
            'error' => trans('site.there_is_no_data'),
        ])->back();
    }
}
