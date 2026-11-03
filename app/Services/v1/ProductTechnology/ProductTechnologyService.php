<?php

namespace App\Services\v1\ProductTechnology;

use App\Traits\Makable;
use App\Models\ProductTechnology;
use App\Services\Contracts\BaseService;
use App\Repositories\ProductTechnologyRepository;

/**
 * @extends BaseService<ProductTechnology>
 *
 * @property ProductTechnologyRepository $repository
 */
class ProductTechnologyService extends BaseService
{
    use Makable;

    protected string $repositoryClass = ProductTechnologyRepository::class;

    public function bySlug(string $slug, array $relations = [], array $counts = []): ?ProductTechnology
    {
        return $this->repository->bySlug($slug, $relations, $counts);
    }
}
