<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Models\ProductRange;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\ProductRangeResource;
use App\Services\v1\ProductRange\ProductRangeService;
use App\DTOs\v1\ProductRange\StoreUpdateProductRangeDTO;

class ProductRangeController extends WebController
{
    private ProductRangeService $productRangeService;

    public function __construct()
    {
        $this->productRangeService = ProductRangeService::make();
        // place the relations you want to return them within the response
        $this->relations = [];
    }

    public function create()
    {
        return Inertia::render('dashboard/product-ranges/create');
    }

    public function data()
    {
        $items = $this->productRangeService->paginate($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy($productRangeId)
    {
        $result = $this->productRangeService->delete($productRangeId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function edit($productRangeId)
    {
        $productRange = $this->productRangeService->view($productRangeId, $this->relations);

        if (! $productRange) {
            abort(404);
        }

        return Inertia::render('dashboard/product-ranges/edit', [
            'productRange' => ProductRangeResource::make($productRange),
        ]);
    }

    public function index()
    {
        $exportables = ProductRange::getModel()->exportable();

        return Inertia::render('dashboard/product-ranges/index', [
            'exportables' => $exportables,
        ]);
    }

    public function show($productRangeId)
    {
        $productRange = $this->productRangeService->view($productRangeId, $this->relations);

        return Inertia::render('dashboard/product-ranges/show', [
            'productRange' => ProductRangeResource::make($productRange),
        ]);
    }

    public function store(StoreUpdateProductRangeDTO $dto)
    {
        $productRange = $this->productRangeService->store($dto->toArray(), $this->relations);
        if ($productRange) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.product.ranges.index');
        }

        return Inertia::flash([
            'success' => trans('site.something_went_wrong'),
        ])->back();
    }

    public function update(StoreUpdateProductRangeDTO $dto, $productRangeId)
    {
        $productRange = $this->productRangeService->update($dto->toArray(), $productRangeId, $this->relations);
        if ($productRange) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.product.ranges.index');
        }

        return Inertia::flash([
            'error' => trans('site.there_is_no_data'),
        ])->back();
    }
}
