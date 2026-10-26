<?php

namespace App\Services\v1\MarketApplication;

use App\Traits\Makable;
use App\Models\MarketApplication;
use App\Services\Contracts\BaseService;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\MarketApplicationRepository;

/**
 * @extends BaseService<MarketApplication>
 *
 * @property MarketApplicationRepository $repository
 */
class MarketApplicationService extends BaseService
{
    use Makable;

    protected string $repositoryClass = MarketApplicationRepository::class;

    /**
     * @return Collection<int, MarketApplication>
     */
    public function featured(array $relations = []): Collection
    {
        return $this->repository->featured($relations);
    }
}
