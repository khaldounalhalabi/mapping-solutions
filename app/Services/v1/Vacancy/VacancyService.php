<?php

namespace App\Services\v1\Vacancy;

use App\Models\Vacancy;
use App\Traits\Makable;
use App\Repositories\VacancyRepository;
use App\Services\Contracts\BaseService;

/**
 * @extends BaseService<Vacancy>
 *
 * @property VacancyRepository $repository
 */
class VacancyService extends BaseService
{
    use Makable;

    protected string $repositoryClass = VacancyRepository::class;
}
