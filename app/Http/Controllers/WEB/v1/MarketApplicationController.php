<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\MarketApplicationResource;
use App\Services\v1\MarketApplication\MarketApplicationService;
use App\DTOs\v1\MarketApplication\StoreUpdateMarketApplicationDTO;

class MarketApplicationController extends WebController
{
    private MarketApplicationService $marketApplicationService;

    public function __construct()
    {
        $this->marketApplicationService = MarketApplicationService::make();
        // place the relations you want to return them within the response
        $this->relations = [];
    }

    public function create()
    {
        return Inertia::render('dashboard/market-applications/create');
    }

    public function data()
    {
        $items = $this->marketApplicationService->paginate($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy($marketApplicationId)
    {
        $result = $this->marketApplicationService->delete($marketApplicationId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function edit($marketApplicationId)
    {
        $marketApplication = $this->marketApplicationService->view($marketApplicationId, $this->relations);

        if (! $marketApplication) {
            abort(404);
        }

        return Inertia::render('dashboard/market-applications/edit', [
            'marketApplication' => MarketApplicationResource::make($marketApplication),
        ]);
    }

    public function index()
    {
        return Inertia::render('dashboard/market-applications/index');
    }

    public function show($marketApplicationId)
    {
        $marketApplication = $this->marketApplicationService->view($marketApplicationId, $this->relations);

        return Inertia::render('dashboard/market-applications/show', [
            'marketApplication' => MarketApplicationResource::make($marketApplication),
        ]);
    }

    public function store(StoreUpdateMarketApplicationDTO $dto)
    {
        $marketApplication = $this->marketApplicationService->store($dto->toArray(), $this->relations);
        if ($marketApplication) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.market.applications.index');
        }

        return Inertia::flash([
            'success' => trans('site.something_went_wrong'),
        ])->back();
    }

    public function update(StoreUpdateMarketApplicationDTO $dto, $marketApplicationId)
    {
        $marketApplication = $this->marketApplicationService->update($dto->toArray(), $marketApplicationId, $this->relations);
        if ($marketApplication) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.market.applications.index');
        }

        return Inertia::flash([
            'error' => trans('site.there_is_no_data'),
        ])->back();
    }
}
