<?php

namespace App\Modules\SharedModule\Traits;

use App\Modules\SharedModule\Common;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Query\Builder as DBBuilder;
use Illuminate\Database\Eloquent\Relations\Relation;

/**
 * @phpstan-consistent-constructor
 */
trait Make
{
    private static $instance;

    protected int $limit = 10;

    protected function formatPaginateData(LengthAwarePaginator $data): array
    {
        return Common::formatPaginateData($data);
    }

    /**
     * @return array{data:mixed , pagination_data:array}|null
     */
    protected function paginate(Builder|DBBuilder|Model|Relation $query): ?array
    {
        return Common::paginateQueryMethod($query, $this->limit);
    }

    public function init(): void {}

    public static function make(): static
    {
        if (is_null(self::$instance)) {
            self::$instance = new static;
        } elseif (! (self::$instance instanceof static)) {
            self::$instance = new static;
        }
        self::$instance->init();

        return self::$instance;
    }
}
