<?php

namespace App\Repositories;

use App\Models\Supplier;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<Supplier>
 */
class SupplierRepository extends BaseRepository
{
    protected string $modelClass = Supplier::class;

    public function count(): int
    {
        return $this->query()
            ->query()
            ->count();
    }
}
