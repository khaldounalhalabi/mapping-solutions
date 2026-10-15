<?php

namespace App\Services\v1\NewsletterSubscriber;

use App\Traits\Makable;
use App\Models\NewsletterSubscriber;
use App\Services\Contracts\BaseService;
use App\Repositories\NewsletterSubscriberRepository;

/**
 * @extends BaseService<NewsletterSubscriber>
 *
 * @property NewsletterSubscriberRepository $repository
 */
class NewsletterSubscriberService extends BaseService
{
    use Makable;

    protected string $repositoryClass = NewsletterSubscriberRepository::class;
}
