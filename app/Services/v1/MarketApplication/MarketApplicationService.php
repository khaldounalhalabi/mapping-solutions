<?php

namespace App\Services\v1\MarketApplication;

use App\Traits\Makable;
use App\Models\MarketApplication;
use App\Services\Contracts\BaseService;
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
}
