<?php

namespace App\Jobs;

use App\Models\NewsletterEmail;
use Illuminate\Support\Facades\URL;
use App\Mail\NewsletterEmailMessage;
use App\Models\NewsletterSubscriber;
use Illuminate\Support\Facades\Mail;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendNewsletterEmail implements ShouldQueue
{
    use Queueable;

    public function __construct(public NewsletterEmail $newsletterEmail) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        NewsletterSubscriber::query()
            ->select(['id', 'email'])
            ->lazyById()
            ->each(function (NewsletterSubscriber $subscriber): void {
                $unsubscribeUrl = URL::signedRoute(
                    'v1.web.public.newsletter.unsubscribe',
                    ['newsletterSubscriber' => $subscriber],
                );

                Mail::to($subscriber->email)->send(
                    new NewsletterEmailMessage($this->newsletterEmail, $unsubscribeUrl),
                );
            });
    }
}
