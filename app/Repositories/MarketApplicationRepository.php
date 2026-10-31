<?php

namespace App\Repositories;

use App\Models\MarketApplication;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<MarketApplication>
 */
class MarketApplicationRepository extends BaseRepository
{
    protected string $modelClass = MarketApplication::class;

    /**
     * @return Collection<int, MarketApplication>
     */
    public function featured(array $relations = []): Collection
    {
        return $this->indexQuery()
            ->relations($relations)
            ->query()
            ->where('is_featured', true)
            ->where('is_visible', true)
            ->orderBy('sort_order')->orderBy('id')
            ->get();
    }

    /**
     * @param int[] $exceptIds
     */
    public function featuredCount(array $exceptIds = []): int
    {
        return $this
            ->query()
            ->query()
            ->when(
                ! empty($exceptIds),
                fn ($query) => $query->whereNotIn('id', $exceptIds),
            )->where('is_featured', true)->count();
    }

    /** @return Collection<int, MarketApplication> */
    public function visible(): Collection
    {
        return $this
            ->query()
            ->query()
            ->where('is_visible', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }
}
