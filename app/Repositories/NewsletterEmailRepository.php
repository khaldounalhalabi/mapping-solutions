<?php

namespace App\Repositories;

use App\Models\NewsletterEmail;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<NewsletterEmail>
 */
class NewsletterEmailRepository extends BaseRepository
{
    protected string $modelClass = NewsletterEmail::class;
}
