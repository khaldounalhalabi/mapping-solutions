<?php

namespace App\Services\v1\NewsArticle;

use App\Traits\Makable;
use App\Models\NewsArticle;
use App\Services\Contracts\BaseService;
use App\Repositories\NewsArticleRepository;

/**
 * @extends BaseService<NewsArticle>
 *
 * @property NewsArticleRepository $repository
 */
class NewsArticleService extends BaseService
{
    use Makable;

    protected string $repositoryClass = NewsArticleRepository::class;
}
