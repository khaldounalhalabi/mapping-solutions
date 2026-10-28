<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\JobApplicationResource;
use App\Services\v1\JobApplication\JobApplicationService;

class JobApplicationController extends WebController
{
    private JobApplicationService $jobApplicationService;

    public function __construct()
    {
        $this->jobApplicationService = JobApplicationService::make();
        // place the relations you want to return them within the response
        $this->relations = ['vacancy'];
    }

    public function data()
    {
        $items = $this->jobApplicationService->paginate($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy($jobApplicationId)
    {
        $result = $this->jobApplicationService->delete($jobApplicationId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function index()
    {
        return Inertia::render('dashboard/job-applications/index');
    }

    public function show($jobApplicationId)
    {
        $jobApplication = $this->jobApplicationService->view($jobApplicationId, $this->relations);

        return Inertia::render('dashboard/job-applications/show', [
            'jobApplication' => JobApplicationResource::make($jobApplication),
        ]);
    }
}
