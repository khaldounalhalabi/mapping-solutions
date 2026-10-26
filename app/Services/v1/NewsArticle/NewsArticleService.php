<?php

namespace App\Services\v1\NewsArticle;

use App\Traits\Makable;
use App\Models\NewsArticle;
use App\Services\Contracts\BaseService;
use App\Repositories\NewsArticleRepository;
use Illuminate\Database\Eloquent\Collection;

/**
 * @extends BaseService<NewsArticle>
 *
 * @property NewsArticleRepository $repository
 */
class NewsArticleService extends BaseService
{
    use Makable;

    protected string $repositoryClass = NewsArticleRepository::class;

    /**
     * @return Collection<int , NewsArticle>
     */
    public function recent(int $count = 3, array $relations = []): Collection
    {
        return $this->repository->recent($count, $relations);
    }
}
