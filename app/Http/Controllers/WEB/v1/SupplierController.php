<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\SupplierResource;
use App\Services\v1\Supplier\SupplierService;
use App\DTOs\v1\Supplier\StoreUpdateSupplierDTO;

class SupplierController extends WebController
{
    private SupplierService $supplierService;

    public function __construct()
    {
        $this->supplierService = SupplierService::make();
        $this->relations = [];
    }

    public function create()
    {
        return Inertia::render('dashboard/suppliers/create');
    }

    public function data()
    {
        $items = $this->supplierService->indexWithPagination($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy($supplierId)
    {
        $result = $this->supplierService->delete($supplierId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function edit($supplierId)
    {
        $supplier = $this->supplierService->view($supplierId, $this->relations);

        if (! $supplier) {
            abort(404);
        }

        return Inertia::render('dashboard/suppliers/edit', [
            'supplier' => SupplierResource::make($supplier),
        ]);
    }

    public function index()
    {
        return Inertia::render('dashboard/suppliers/index');
    }

    public function show($supplierId)
    {
        $supplier = $this->supplierService->view($supplierId, $this->relations);

        return Inertia::render('dashboard/suppliers/show', [
            'supplier' => SupplierResource::make($supplier),
        ]);
    }

    public function store(StoreUpdateSupplierDTO $dto)
    {
        $supplier = $this->supplierService->store($dto->toArray(), $this->relations);
        if ($supplier) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.suppliers.index');
        }

        return Inertia::flash([
            'success' => trans('site.something_went_wrong'),
        ])->back();
    }

    public function update(StoreUpdateSupplierDTO $dto, $supplierId)
    {
        $supplier = $this->supplierService->update($dto->toArray(), $supplierId, $this->relations);
        if ($supplier) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.suppliers.index');
        }

        return Inertia::flash([
            'error' => trans('site.there_is_no_data'),
        ])->back();
    }
}
