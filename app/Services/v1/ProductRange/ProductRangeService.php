<?php

namespace App\Services\v1\ProductRange;

use App\Traits\Makable;
use App\Models\ProductRange;
use App\Services\Contracts\BaseService;
use App\Repositories\ProductRangeRepository;

/**
 * @extends BaseService<ProductRange>
 *
 * @property ProductRangeRepository $repository
 */
class ProductRangeService extends BaseService
{
    use Makable;

    protected string $repositoryClass = ProductRangeRepository::class;
}
