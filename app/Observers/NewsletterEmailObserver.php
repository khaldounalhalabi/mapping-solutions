<?php

namespace App\Observers;

use App\Models\NewsletterEmail;
use App\Jobs\SendNewsletterEmail;
use Illuminate\Contracts\Events\ShouldHandleEventsAfterCommit;

class NewsletterEmailObserver implements ShouldHandleEventsAfterCommit
{
    public function created(NewsletterEmail $newsletterEmail): void
    {
        SendNewsletterEmail::dispatch($newsletterEmail);
    }
}
