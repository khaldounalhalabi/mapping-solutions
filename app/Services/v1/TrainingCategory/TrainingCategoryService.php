<?php

namespace App\Services\v1\TrainingCategory;

use App\Traits\Makable;
use App\Models\TrainingCategory;
use App\Services\Contracts\BaseService;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\TrainingCategoryRepository;

/**
 * @extends BaseService<TrainingCategory>
 *
 * @property TrainingCategoryRepository $repository
 */
class TrainingCategoryService extends BaseService
{
    use Makable;

    protected string $repositoryClass = TrainingCategoryRepository::class;

    /** @return Collection<int, TrainingCategory> */
    public function published(array $relations = [] , array $counts = []): Collection
    {
        return $this->repository->published($relations , $counts);
    }
}
