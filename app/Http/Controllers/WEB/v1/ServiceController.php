<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\ServiceResource;
use App\Services\v1\Service\ServiceService;
use App\DTOs\v1\Service\StoreUpdateServiceDTO;

class ServiceController extends WebController
{
    private ServiceService $serviceService;

    public function __construct()
    {
        $this->serviceService = ServiceService::make();
        // place the relations you want to return them within the response
        $this->relations = ['serviceCategory'];
    }

    public function create()
    {
        return Inertia::render('dashboard/services/create');
    }

    public function data()
    {
        $items = $this->serviceService->paginate($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy($serviceId)
    {
        $result = $this->serviceService->delete($serviceId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function edit($serviceId)
    {
        $service = $this->serviceService->view($serviceId, $this->relations);

        if (! $service) {
            abort(404);
        }

        return Inertia::render('dashboard/services/edit', [
            'service' => ServiceResource::make($service),
        ]);
    }

    public function index()
    {
        return Inertia::render('dashboard/services/index');
    }

    public function show($serviceId)
    {
        $service = $this->serviceService->view($serviceId, $this->relations);

        return Inertia::render('dashboard/services/show', [
            'service' => ServiceResource::make($service),
        ]);
    }

    public function store(StoreUpdateServiceDTO $dto)
    {
        $service = $this->serviceService->store($dto->toArray(), $this->relations);
        if ($service) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.services.index');
        }

        return Inertia::flash([
            'success' => trans('site.something_went_wrong'),
        ])->back();
    }

    public function update(StoreUpdateServiceDTO $dto, $serviceId)
    {
        $service = $this->serviceService->update($dto->toArray(), $serviceId, $this->relations);
        if ($service) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.services.index');
        }

        return Inertia::flash([
            'error' => trans('site.there_is_no_data'),
        ])->back();
    }
}
