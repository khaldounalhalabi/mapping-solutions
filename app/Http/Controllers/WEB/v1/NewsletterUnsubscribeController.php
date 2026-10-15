<?php

namespace App\Http\Controllers\WEB\v1;

use Illuminate\Contracts\View\View;
use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;

class NewsletterUnsubscribeController extends Controller
{
    public function __invoke(NewsletterSubscriber $newsletterSubscriber): View
    {
        $newsletterSubscriber->delete();

        return view('emails.newsletter-unsubscribed');
    }
}
