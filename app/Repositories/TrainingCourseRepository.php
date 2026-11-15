<?php

namespace App\Repositories;

use App\Models\TrainingCourse;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<TrainingCourse>
 */
class TrainingCourseRepository extends BaseRepository
{
    protected string $modelClass = TrainingCourse::class;

    public function publishedById(int $id, array $relations = [], array $counts = []): ?TrainingCourse
    {
        return $this->query()
            ->relations($relations)
            ->counts($counts)
            ->where('is_published', true)
            ->find($id);
    }
}
