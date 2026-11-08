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

    public function bySlug(string $slug, array $relations = [], array $counts = []): ?Supplier
    {
        return $this->query()
            ->counts($counts)
            ->relations($relations)
            ->where('slug', $slug)
            ->first();
    }

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

    public function searchSuggestions(): Collection
    {
        return $this->query()
            ->search()
            ->filter()
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->limit(5)
            ->get();
    }
}
