<?php

namespace App\Repositories;

use App\Models\NewsArticle;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<NewsArticle>
 */
class NewsArticleRepository extends BaseRepository
{
    protected string $modelClass = NewsArticle::class;
}
