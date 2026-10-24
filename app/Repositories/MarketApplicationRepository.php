<?php

namespace App\Repositories;

use App\Models\MarketApplication;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<MarketApplication>
 */
class MarketApplicationRepository extends BaseRepository
{
    protected string $modelClass = MarketApplication::class;

    /**
     * @param int[] $exceptIds
     */
    public function featuredCount(array $exceptIds = []): int
    {
        return $this
            ->globalQuery()
            ->when(
                ! empty($exceptIds),
                fn ($query) => $query->whereNotIn('id', $exceptIds),
            )->count();
    }
}
