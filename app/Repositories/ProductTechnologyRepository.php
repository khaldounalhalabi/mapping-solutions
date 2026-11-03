<?php

namespace App\Repositories;

use App\Models\ProductTechnology;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<ProductTechnology>
 */
class ProductTechnologyRepository extends BaseRepository
{
    protected string $modelClass = ProductTechnology::class;

    public function bySlug(string $slug, array $relations = [], array $counts = []): ?ProductTechnology
    {
        return $this->query()
            ->counts($counts)
            ->relations($relations)
            ->query()
            ->where('slug', $slug)
            ->first();
    }
}
