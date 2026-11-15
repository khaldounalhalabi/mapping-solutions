<?php

namespace App\Services\v1\EmailReceiver;

use App\Models\Inquiry;
use App\Traits\Makable;
use App\Models\EmailReceiver;
use App\Models\JobApplication;
use App\Mail\NewInquiryMessage;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewJobApplicationMessage;
use App\Services\Contracts\BaseService;
use App\Repositories\EmailReceiverRepository;

/**
 * @extends BaseService<EmailReceiver>
 *
 * @property EmailReceiverRepository $repository
 */
class EmailReceiverService extends BaseService
{
    use Makable;

    protected string $repositoryClass = EmailReceiverRepository::class;

    public function notifyOfSubmission(Inquiry|JobApplication $submission): void
    {
        foreach ($this->repository->emailAddresses() as $email) {
            $message = $submission instanceof Inquiry
                ? new NewInquiryMessage($submission)
                : new NewJobApplicationMessage($submission);

            Mail::to($email)->queue($message->afterCommit());
        }
    }
}
