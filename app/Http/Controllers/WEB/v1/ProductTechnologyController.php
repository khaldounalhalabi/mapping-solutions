<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\ProductTechnologyResource;
use App\Services\v1\ProductTechnology\ProductTechnologyService;
use App\DTOs\v1\ProductTechnology\StoreUpdateProductTechnologyDTO;

class ProductTechnologyController extends WebController
{
    private ProductTechnologyService $productTechnologyService;

    public function __construct()
    {
        $this->productTechnologyService = ProductTechnologyService::make();
        // place the relations you want to return them within the response
        $this->relations = [];
    }

    public function create()
    {
        return Inertia::render('dashboard/product-technologies/create');
    }

    public function data()
    {
        $items = $this->productTechnologyService->indexWithPagination($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy($productTechnologyId)
    {
        $result = $this->productTechnologyService->delete($productTechnologyId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function edit($productTechnologyId)
    {
        $productTechnology = $this->productTechnologyService->view($productTechnologyId, $this->relations);

        if (! $productTechnology) {
            abort(404);
        }

        return Inertia::render('dashboard/product-technologies/edit', [
            'productTechnology' => ProductTechnologyResource::make($productTechnology),
        ]);
    }

    public function index()
    {
        return Inertia::render('dashboard/product-technologies/index');
    }

    public function show($productTechnologyId)
    {
        $productTechnology = $this->productTechnologyService->view($productTechnologyId, $this->relations);

        return Inertia::render('dashboard/product-technologies/show', [
            'productTechnology' => ProductTechnologyResource::make($productTechnology),
        ]);
    }

    public function store(StoreUpdateProductTechnologyDTO $dto)
    {
        $productTechnology = $this->productTechnologyService->store($dto->toArray(), $this->relations);
        if ($productTechnology) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.product.technologies.index');
        }

        return Inertia::flash([
            'success' => trans('site.something_went_wrong'),
        ])->back();
    }

    public function update(StoreUpdateProductTechnologyDTO $dto, $productTechnologyId)
    {
        $productTechnology = $this->productTechnologyService->update($dto->toArray(), $productTechnologyId, $this->relations);
        if ($productTechnology) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.product.technologies.index');
        }

        return Inertia::flash([
            'error' => trans('site.there_is_no_data'),
        ])->back();
    }
}
