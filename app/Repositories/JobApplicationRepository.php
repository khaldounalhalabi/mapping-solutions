<?php

namespace App\Repositories;

use App\Models\JobApplication;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<JobApplication>
 */
class JobApplicationRepository extends BaseRepository
{
    protected string $modelClass = JobApplication::class;
}
