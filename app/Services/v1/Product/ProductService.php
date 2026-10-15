<?php

namespace App\Services\v1\Product;

use App\Models\Product;
use App\Traits\Makable;
use App\Repositories\ProductRepository;
use App\Services\Contracts\BaseService;

/**
 * @extends BaseService<Product>
 *
 * @property ProductRepository $repository
 */
class ProductService extends BaseService
{
    use Makable;

    protected string $repositoryClass = ProductRepository::class;
}
