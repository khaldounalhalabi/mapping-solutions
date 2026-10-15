<?php

namespace App\Repositories;

use App\Models\NewsletterSubscriber;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<NewsletterSubscriber>
 */
class NewsletterSubscriberRepository extends BaseRepository
{
    protected string $modelClass = NewsletterSubscriber::class;
}
