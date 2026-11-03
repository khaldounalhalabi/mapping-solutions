<?php

namespace App\Services\v1\Product;

use App\Models\Product;
use App\Traits\Makable;
use App\Repositories\ProductRepository;
use App\Services\Contracts\BaseService;
use Illuminate\Database\Eloquent\Collection;

/**
 * @extends BaseService<Product>
 *
 * @property ProductRepository $repository
 */
class ProductService extends BaseService
{
    use Makable;

    protected string $repositoryClass = ProductRepository::class;

    /**
     * @return Collection<int , Product>
     */
    public function getBySupplierAndProductTechnology(int $supplierId, int $productTechnologyId, array $relations = [], array $counts = []): Collection
    {
        return $this->repository->getBySupplierAndProductTechnology($supplierId, $productTechnologyId, $relations, $counts);
    }
}
