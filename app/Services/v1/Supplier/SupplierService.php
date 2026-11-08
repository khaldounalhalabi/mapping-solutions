<?php

namespace App\Services\v1\Supplier;

use App\Traits\Makable;
use App\Models\Supplier;
use App\Services\Contracts\BaseService;
use App\Repositories\SupplierRepository;
use Illuminate\Database\Eloquent\Collection;

/**
 * @extends BaseService<Supplier>
 *
 * @property SupplierRepository $repository
 */
class SupplierService extends BaseService
{
    use Makable;

    protected string $repositoryClass = SupplierRepository::class;

    public function bySlug(string $slug, array $relations = [], array $counts = []): ?Supplier
    {
        return $this->repository->bySlug($slug, $relations, $counts);
    }

    public function count(): int
    {
        return cache()->remember(
            Supplier::SUPPLIERS_COUNT_CACHE_KEY,
            now()->addMinutes(30),
            fn () => $this->repository->count()
        );
    }

    /**
     * @return Collection<int , Supplier>
     */
    public function getByProductTechnology(string $productTechnologySlug, array $relations = [], array $counts = []): Collection
    {
        return $this->repository->getByProductTechnology($productTechnologySlug, $relations, $counts);
    }

    public function searchSuggestions(): Collection
    {
        return $this->repository->searchSuggestions();
    }
}
