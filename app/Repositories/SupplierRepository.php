<?php

namespace App\Repositories;

use App\Models\Supplier;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\BaseRepository;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

/**
 * @extends  BaseRepository<Supplier>
 */
class SupplierRepository extends BaseRepository
{
    protected string $modelClass = Supplier::class;

    public function count(): int
    {
        return $this->query()
            ->query()
            ->count();
    }

    /**
     * @return Collection<int, Supplier>
     */
    public function getByProductTechnology(string $productTechnologySlug, array $relations = [], array $counts = []): Collection
    {
        return $this->query()
            ->relations($relations)
            ->counts($counts)
            ->query()
            ->whereHas('productTechnologies', function (HasManyThrough|Builder $query) use ($productTechnologySlug) {
                $query->where('product_technologies.slug', $productTechnologySlug);
            })->get();
    }
}
