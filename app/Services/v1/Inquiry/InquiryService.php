<?php

namespace App\Services\v1\Inquiry;

use Throwable;
use App\Models\Inquiry;
use App\Traits\Makable;
use Illuminate\Support\Facades\DB;
use App\Mail\InquiryResponseMessage;
use Illuminate\Support\Facades\Mail;
use App\Repositories\InquiryRepository;
use App\Services\Contracts\BaseService;

/**
 * @extends BaseService<Inquiry>
 *
 * @property InquiryRepository $repository
 */
class InquiryService extends BaseService
{
    use Makable;

    protected string $repositoryClass = InquiryRepository::class;

    /**
     * @param array{subject: string, message: string} $data
     *
     * @throws Throwable
     */
    public function respond(int|string $inquiryId, array $data, int $respondedById): ?Inquiry
    {
        return DB::transaction(function () use ($inquiryId, $data, $respondedById): ?Inquiry {
            $inquiry = $this->view($inquiryId);

            if (! $inquiry) {
                return null;
            }

            /** @var Inquiry $inquiry */
            $inquiry = $this->update([
                'response_subject' => $data['subject'],
                'response_message' => $data['message'],
                'responded_by_id'  => $respondedById,
                'responded_at'     => now(),
            ], $inquiry);

            if (! $inquiry) {
                return null;
            }

            Mail::to($inquiry->email)->queue(
                (new InquiryResponseMessage($inquiry))->afterCommit(),
            );

            return $inquiry;
        });
    }
}
