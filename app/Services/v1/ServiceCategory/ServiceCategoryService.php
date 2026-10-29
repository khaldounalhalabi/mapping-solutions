<?php

namespace App\Services\v1\ServiceCategory;

use App\Traits\Makable;
use App\Models\ServiceCategory;
use App\Services\Contracts\BaseService;
use App\Repositories\ServiceCategoryRepository;

/**
 * @extends BaseService<ServiceCategory>
 *
 * @property ServiceCategoryRepository $repository
 */
class ServiceCategoryService extends BaseService
{
    use Makable;

    protected string $repositoryClass = ServiceCategoryRepository::class;
}
