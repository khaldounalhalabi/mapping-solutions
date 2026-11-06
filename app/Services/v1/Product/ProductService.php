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

    public function bySlug(string $slug, array $relations = [], array $counts = []): ?Product
    {
        return $this->repository->bySlug($slug, $relations, $counts);
    }

    public function bySupplier(int $supplierId, array $relations = [], array $counts = [])
    {
        return $this->repository->bySupplier($supplierId, $relations, $counts);
    }

    /**
     * @return Collection<int , Product>
     */
    public function getBySupplierAndProductTechnology(int $supplierId, int $productTechnologyId, array $relations = [], array $counts = []): Collection
    {
        return $this->repository->getBySupplierAndProductTechnology($supplierId, $productTechnologyId, $relations, $counts);
    }

    /**
     * @return Collection<int, Product>
     */
    public function searchSuggestions(): Collection
    {
        return $this->repository->searchSuggestions();
    }
}
