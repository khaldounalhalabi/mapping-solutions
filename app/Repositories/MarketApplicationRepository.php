<?php

namespace App\Repositories;

use App\Models\MarketApplication;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<MarketApplication>
 */
class MarketApplicationRepository extends BaseRepository
{
    protected string $modelClass = MarketApplication::class;
}
