<?php

namespace App\Repositories;

use App\Models\NewsArticle;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<NewsArticle>
 */
class NewsArticleRepository extends BaseRepository
{
    protected string $modelClass = NewsArticle::class;

    /**
     * @return Collection<int,NewsArticle>
     */
    public function recent(int $count = 3, array $relations = []): Collection
    {
        return $this
            ->query()
            ->relations($relations)
            ->query()
            ->orderByDesc('created_at')
            ->limit($count)
            ->get();
    }
}
