<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Support\LazyCollection;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<Product>
 */
class ProductRepository extends BaseRepository
{
    protected string $modelClass = Product::class;

    public function bySlug(string $slug, array $relations = [], array $counts = []): ?Product
    {
        return $this
            ->query()
            ->relations($relations)
            ->counts($counts)
            ->where('slug', $slug)
            ->first();
    }

    /**
     * @return Collection<int, Product>
     */
    public function bySupplier(int $supplierId, array $relations = [], array $counts = []): Collection
    {
        return $this->query()
            ->relations($relations)
            ->counts($counts)
            ->where('supplier_id', $supplierId)
            ->get();
    }

    public function count(): int
    {
        return $this
            ->query()
            ->count();
    }

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

    /**
     * @return Collection<int, Product>
     */
    public function searchSuggestions(array $relations = [], array $counts = []): Collection
    {
        return $this->query()
            ->search()
            ->filter()
            ->relations($relations)
            ->counts($counts)
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->limit(5)
            ->get();
    }

    /** @return LazyCollection<int, Product> */
    public function sitemapTechnologySupplierRecords(): LazyCollection
    {
        return $this->model->newQuery()
            ->join('suppliers', 'suppliers.id', '=', 'products.supplier_id')
            ->join('product_technologies', 'product_technologies.id', '=', 'products.product_technology_id')
            ->select(['suppliers.slug as supplier_slug', 'product_technologies.slug as technology_slug'])
            ->where('suppliers.slug', '!=', '')
            ->where('product_technologies.slug', '!=', '')
            ->distinct()
            ->orderBy('product_technologies.slug')
            ->orderBy('suppliers.slug')
            ->lazy(500);
    }
}
