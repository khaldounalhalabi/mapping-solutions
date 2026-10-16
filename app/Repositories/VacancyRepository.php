<?php

namespace App\Repositories;

use App\Models\Vacancy;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<Vacancy>
 */
class VacancyRepository extends BaseRepository
{
    protected string $modelClass = Vacancy::class;
}
