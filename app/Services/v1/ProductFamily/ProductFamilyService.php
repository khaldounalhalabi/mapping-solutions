<?php

namespace App\Services\v1\ProductFamily;

use App\Traits\Makable;
use App\Models\ProductFamily;
use App\Services\Contracts\BaseService;
use App\Repositories\ProductFamilyRepository;

/**
 * @extends BaseService<ProductFamily>
 *
 * @property ProductFamilyRepository $repository
 */
class ProductFamilyService extends BaseService
{
    use Makable;

    protected string $repositoryClass = ProductFamilyRepository::class;
}
