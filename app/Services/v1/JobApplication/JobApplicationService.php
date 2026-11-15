<?php

namespace App\Services\v1\JobApplication;

use Throwable;
use App\Traits\Makable;
use App\Models\JobApplication;
use Illuminate\Support\Facades\DB;
use App\Services\Contracts\BaseService;
use App\Repositories\JobApplicationRepository;
use App\Services\v1\EmailReceiver\EmailReceiverService;

/**
 * @extends BaseService<JobApplication>
 *
 * @property JobApplicationRepository $repository
 */
class JobApplicationService extends BaseService
{
    use Makable;

    protected string $repositoryClass = JobApplicationRepository::class;

    /**
     * @throws Throwable
     */
    public function store(array $data, array $relationships = [], array $counts = []): JobApplication
    {
        return DB::transaction(function () use ($data, $relationships, $counts): JobApplication {
            /** @var JobApplication $submission */
            $submission = parent::store($data, $relationships, $counts);
            EmailReceiverService::make()->notifyOfSubmission($submission);

            return $submission;
        });
    }
}
