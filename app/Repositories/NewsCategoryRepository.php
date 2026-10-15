<?php

namespace App\Repositories;

use App\Models\NewsCategory;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<NewsCategory>
 */
class NewsCategoryRepository extends BaseRepository
{
    protected string $modelClass = NewsCategory::class;
}
