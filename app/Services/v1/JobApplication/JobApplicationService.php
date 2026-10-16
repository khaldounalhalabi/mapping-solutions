<?php

namespace App\Services\v1\JobApplication;

use App\Traits\Makable;
use App\Models\JobApplication;
use App\Services\Contracts\BaseService;
use App\Repositories\JobApplicationRepository;

/**
 * @extends BaseService<JobApplication>
 *
 * @property JobApplicationRepository $repository
 */
class JobApplicationService extends BaseService
{
    use Makable;

    protected string $repositoryClass = JobApplicationRepository::class;
}
