<?php

namespace App\Services\v1\TrainingCourse;

use App\Traits\Makable;
use App\Models\TrainingCourse;
use App\Services\Contracts\BaseService;
use App\Repositories\TrainingCourseRepository;

/**
 * @extends BaseService<TrainingCourse>
 *
 * @property TrainingCourseRepository $repository
 */
class TrainingCourseService extends BaseService
{
    use Makable;

    protected string $repositoryClass = TrainingCourseRepository::class;

    public function publishedById(int $id, array $relations = [], array $counts = []): ?TrainingCourse
    {
        return $this->repository->publishedById($id, $relations, $counts);
    }
}
