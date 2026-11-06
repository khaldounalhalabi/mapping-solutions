<?php

namespace App\Services\v1\NewsArticle;

use App\Traits\Makable;
use App\Models\NewsArticle;
use App\Services\Contracts\BaseService;
use App\Repositories\NewsArticleRepository;
use Carbon\Carbon;
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

    public function bySlug(string $newsArticleSlug, array $relations = [], array $counts = []): ?NewsArticle
    {
        return $this->repository->bySlug($newsArticleSlug, $relations, $counts);
    }

    /**
     * @return Collection<int , NewsArticle>
     */
    public function recent(int $count = 3, array $relations = []): Collection
    {
        return $this->repository->recent($count, $relations);
    }

    public function previousTo(Carbon $createdAt, array $relations = [], array $counts = []): ?NewsArticle
    {
        return $this->repository->previousTo($createdAt, $relations, $counts);
    }
}
