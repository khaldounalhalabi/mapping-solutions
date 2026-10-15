<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<Product>
 */
class ProductRepository extends BaseRepository
{
    protected string $modelClass = Product::class;
}
