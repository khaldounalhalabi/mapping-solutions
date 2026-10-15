<?php

namespace App\Services\v1\Service;

use App\Models\Service;
use App\Traits\Makable;
use App\Repositories\ServiceRepository;
use App\Services\Contracts\BaseService;

/**
 * @extends BaseService<Service>
 *
 * @property ServiceRepository $repository
 */
class ServiceService extends BaseService
{
    use Makable;

    protected string $repositoryClass = ServiceRepository::class;
}
