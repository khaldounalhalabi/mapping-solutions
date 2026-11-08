<?php

namespace App\Http\Controllers\WEB\v1;

use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\WebController;
use App\Services\v1\NewsletterSubscriber\NewsletterSubscriberService;
use App\DTOs\v1\NewsletterSubscriber\StoreUpdateNewsletterSubscriberDTO;

class NewsletterSubscribeController extends WebController
{
    public function __invoke(StoreUpdateNewsletterSubscriberDTO $dto): RedirectResponse
    {
        NewsletterSubscriberService::make()->store($dto->toArray());

        return back();
    }
}
