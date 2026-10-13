<?php

namespace App\Services\v1\Supplier;

use App\Traits\Makable;
use App\Models\Supplier;
use App\Services\Contracts\BaseService;
use App\Repositories\SupplierRepository;

/**
 * @extends BaseService<Supplier>
 *
 * @property SupplierRepository $repository
 */
class SupplierService extends BaseService
{
    use Makable;

    protected string $repositoryClass = SupplierRepository::class;
}
