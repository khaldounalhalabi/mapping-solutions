<?php

namespace App\Repositories;

use App\Models\ProductRange;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<ProductRange>
 */
class ProductRangeRepository extends BaseRepository
{
    protected string $modelClass = ProductRange::class;
}
