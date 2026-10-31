<?php

namespace App\Services\v1\Vacancy;

use App\Models\Vacancy;
use App\Traits\Makable;
use App\Repositories\VacancyRepository;
use App\Services\Contracts\BaseService;
use Illuminate\Database\Eloquent\Collection;

/**
 * @extends BaseService<Vacancy>
 *
 * @property VacancyRepository $repository
 */
class VacancyService extends BaseService
{
    use Makable;

    protected string $repositoryClass = VacancyRepository::class;

    /** @return Collection<int, Vacancy> */
    public function current(): Collection
    {
        return $this->repository->current();
    }

    public function currentBySlug(string $slug): ?Vacancy
    {
        return $this->repository->currentBySlug($slug);
    }
}
