<?php

namespace App\Repositories;

use App\Models\TrainingCategory;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<TrainingCategory>
 */
class TrainingCategoryRepository extends BaseRepository
{
    protected string $modelClass = TrainingCategory::class;

    /** @return Collection<int, TrainingCategory> */
    public function published(array $relations = [], array $counts = []): Collection
    {
        return $this->query()
            ->relations($relations)
            ->counts($counts)
            ->orderBy('sort_order')->orderBy('id')->get();
    }
}
