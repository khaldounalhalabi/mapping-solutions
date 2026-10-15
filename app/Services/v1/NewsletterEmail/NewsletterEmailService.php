<?php

namespace App\Services\v1\NewsletterEmail;

use App\Traits\Makable;
use App\Models\NewsletterEmail;
use App\Services\Contracts\BaseService;
use App\Repositories\NewsletterEmailRepository;

/**
 * @extends BaseService<NewsletterEmail>
 *
 * @property NewsletterEmailRepository $repository
 */
class NewsletterEmailService extends BaseService
{
    use Makable;

    protected string $repositoryClass = NewsletterEmailRepository::class;
}
