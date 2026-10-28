<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\ProductFamilyResource;
use App\Services\v1\ProductFamily\ProductFamilyService;
use App\DTOs\v1\ProductFamily\StoreUpdateProductFamilyDTO;

class ProductFamilyController extends WebController
{
    private ProductFamilyService $productFamilyService;

    public function __construct()
    {
        $this->productFamilyService = ProductFamilyService::make();
        $this->relations = ['supplier'];
    }

    public function create()
    {
        return Inertia::render('dashboard/product-families/create');
    }

    public function data()
    {
        $items = $this->productFamilyService->paginate($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy($productFamilyId)
    {
        $result = $this->productFamilyService->delete($productFamilyId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function edit($productFamilyId)
    {
        $productFamily = $this->productFamilyService->view($productFamilyId, $this->relations);

        if (! $productFamily) {
            abort(404);
        }

        return Inertia::render('dashboard/product-families/edit', [
            'productFamily' => ProductFamilyResource::make($productFamily),
        ]);
    }

    public function index()
    {
        return Inertia::render('dashboard/product-families/index');
    }

    public function show($productFamilyId)
    {
        $productFamily = $this->productFamilyService->view($productFamilyId, $this->relations);

        return Inertia::render('dashboard/product-families/show', [
            'productFamily' => ProductFamilyResource::make($productFamily),
        ]);
    }

    public function store(StoreUpdateProductFamilyDTO $dto)
    {
        $productFamily = $this->productFamilyService->store($dto->toArray(), $this->relations);
        if ($productFamily) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.product.families.index');
        }

        return Inertia::flash([
            'success' => trans('site.something_went_wrong'),
        ])->back();
    }

    public function update(StoreUpdateProductFamilyDTO $dto, $productFamilyId)
    {
        $productFamily = $this->productFamilyService->update($dto->toArray(), $productFamilyId, $this->relations);
        if ($productFamily) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.product.families.index');
        }

        return Inertia::flash([
            'error' => trans('site.there_is_no_data'),
        ])->back();
    }
}
