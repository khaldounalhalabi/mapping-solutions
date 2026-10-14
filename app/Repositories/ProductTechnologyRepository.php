<?php

namespace App\Repositories;

use App\Models\ProductTechnology;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<ProductTechnology>
 */
class ProductTechnologyRepository extends BaseRepository
{
    protected string $modelClass = ProductTechnology::class;
}
