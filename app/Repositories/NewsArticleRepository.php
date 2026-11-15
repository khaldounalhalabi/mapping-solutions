<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Models\NewsArticle;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<NewsArticle>
 */
class NewsArticleRepository extends BaseRepository
{
    protected string $modelClass = NewsArticle::class;

    public function bySlug(string $slug, array $relations = [], array $counts = []): ?NewsArticle
    {
        return $this->query()
            ->relations($relations)
            ->counts($counts)
            ->where('slug', $slug)
            ->first();
    }

    public function previousTo(Carbon $createdAt, array $relations = [], array $counts = []): ?NewsArticle
    {
        return $this->query()
            ->relations($relations)
            ->counts($counts)
            ->where('created_at', '<', $createdAt)
            ->orderByDesc('created_at')
            ->first();
    }

    /**
     * @return Collection<int,NewsArticle>
     */
    public function recent(int $count = 3, array $relations = []): Collection
    {
        return $this
            ->query()
            ->relations($relations)
            ->orderByDesc('created_at')
            ->limit($count)
            ->get();
    }
}
