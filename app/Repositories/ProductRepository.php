<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<Product>
 */
class ProductRepository extends BaseRepository
{
    protected string $modelClass = Product::class;

    /**
     * @return Collection<int , Product>
     */
    public function getBySupplierAndProductTechnology(int $supplierId, int $productTechnologyId, array $relations = [], array $counts = []): Collection
    {
        return $this->query()
            ->relations($relations)
            ->counts($counts)
            ->where('supplier_id', $supplierId)
            ->where('product_technology_id', $productTechnologyId)
            ->get();
    }
}
