<?php

namespace App\Services\v1\NewsCategory;

use App\Traits\Makable;
use App\Models\NewsCategory;
use App\Services\Contracts\BaseService;
use App\Repositories\NewsCategoryRepository;

/**
 * @extends BaseService<NewsCategory>
 *
 * @property NewsCategoryRepository $repository
 */
class NewsCategoryService extends BaseService
{
    use Makable;

    protected string $repositoryClass = NewsCategoryRepository::class;
}
