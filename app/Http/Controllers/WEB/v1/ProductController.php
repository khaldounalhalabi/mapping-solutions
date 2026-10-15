<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\ProductResource;
use App\Services\v1\Product\ProductService;
use App\DTOs\v1\Product\StoreUpdateProductDTO;

class ProductController extends WebController
{
    private ProductService $productService;

    public function __construct()
    {
        $this->productService = ProductService::make();
        // place the relations you want to return them within the response
        $this->relations = ['supplier', 'productFamily', 'productTechnology'];
    }

    public function create()
    {
        return Inertia::render('dashboard/products/create');
    }

    public function data()
    {
        $items = $this->productService->indexWithPagination($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy($productId)
    {
        $result = $this->productService->delete($productId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function edit($productId)
    {
        $product = $this->productService->view($productId, $this->relations);

        if (! $product) {
            abort(404);
        }

        return Inertia::render('dashboard/products/edit', [
            'product' => ProductResource::make($product),
        ]);
    }

    public function index()
    {
        return Inertia::render('dashboard/products/index');
    }

    public function show($productId)
    {
        $product = $this->productService->view($productId, $this->relations);

        return Inertia::render('dashboard/products/show', [
            'product' => ProductResource::make($product),
        ]);
    }

    public function store(StoreUpdateProductDTO $dto)
    {
        $product = $this->productService->store($dto->toArray(), $this->relations);
        if ($product) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.products.index');
        }

        return Inertia::flash([
            'success' => trans('site.something_went_wrong'),
        ])->back();
    }

    public function update(StoreUpdateProductDTO $dto, $productId)
    {
        $product = $this->productService->update($dto->toArray(), $productId, $this->relations);
        if ($product) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.products.index');
        }

        return Inertia::flash([
            'error' => trans('site.there_is_no_data'),
        ])->back();
    }
}
