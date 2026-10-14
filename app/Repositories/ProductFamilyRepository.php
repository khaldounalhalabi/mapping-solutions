<?php

namespace App\Repositories;

use App\Models\ProductFamily;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<ProductFamily>
 */
class ProductFamilyRepository extends BaseRepository
{
    protected string $modelClass = ProductFamily::class;
}
