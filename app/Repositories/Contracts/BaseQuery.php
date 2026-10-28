<?php

namespace App\Repositories\Contracts;

use Closure;
use App\Casts\Translatable;
use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Traits\Conditionable;

/**
 * @template MODEL of Model
 */
class BaseQuery
{
    use Conditionable;

    /**
     * @var string[]
     */
    private array $columns;

    private array $filterKeys = [];

    /**
     * @var class-string<MODEL>
     */
    private string $modelClass;

    /**
     * @var Builder<MODEL>|MODEL
     */
    private Builder|Model $query;

    /**
     * @var array<string,array<int,string>>
     */
    private array $relationSearchableKeys = [];

    /**
     * @var string[]
     */
    private array $searchableKeys = [];

    private string $tableName;

    /**
     * @var string[]|array<string,Closure>
     */
    protected array $counts = [];

    /**
     * @var string[]|array<string, Closure>
     */
    protected array $relations = [];

    /**
     * @var string[]
     */
    protected array $translatables = [];

    /**
     * @param class-string<MODEL> $modelClass
     */
    public function __construct(string $modelClass)
    {
        $this->modelClass = $modelClass;

        /**
         * @var MODEL $modelInstance
         */
        $modelInstance = new $this->modelClass;

        $this->query = $this->modelClass::query();
        $this->tableName = $modelInstance->getTable();

        if (method_exists($modelInstance, 'searchableArray')) {
            $this->searchableKeys = $modelInstance->searchableArray();
        }

        if (method_exists($modelInstance, 'relationsSearchableArray')) {
            $this->relationSearchableKeys = $modelInstance->relationsSearchableArray();
        }

        if (method_exists($modelInstance, 'filterArray')) {
            $this->filterKeys = $modelInstance->filterArray();
        }

        $this->columns = $modelInstance->getFillable();

        foreach ($modelInstance->getCasts() as $key => $cast) {
            if ($cast == Translatable::class) {
                $this->translatables[] = $key;
            }
        }
    }

    /**
     * @return Builder<MODEL>|MODEL
     */
    private function addSearch($query): Builder|Model
    {
        if (! request()->has('search')) {
            return $query;
        }

        $keyword = request()->string('search');

        if (count($this->searchableKeys) > 0) {
            foreach ($this->searchableKeys as $searchAttribute) {
                $query->orWhere($searchAttribute, 'LIKE', "%{$keyword}%");
            }
        }

        if (count($this->relationSearchableKeys) > 0) {

            foreach ($this->relationSearchableKeys as $relation => $values) {
                foreach ($values as $searchAttribute) {
                    $query->orWhereHas($relation, function ($q) use ($keyword, $searchAttribute) {
                        $q->where($searchAttribute, 'LIKE', "%{$keyword}%");
                    });
                }
            }
        }
        $query->orWhere('id', $keyword);

        return $query;
    }

    /**
     * @return Builder<MODEL>|MODEL
     */
    private function filterFields(Builder $query): Builder|Model
    {
        foreach ($this->filterKeys as $filterFields) {
            $field = $filterFields['field'] ?? $filterFields['name'];
            $operator = $filterFields['operator'] ?? '=';
            $relation = $filterFields['relation'] ?? null;
            $method = $filterFields['method'] ?? 'where';
            $callback = $filterFields['query'] ?? null;
            $value = request($field);
            $range = is_array($value);
            $value = self::nullIfEmpty($value);
            if ($range && isset($value)) {
                $value = array_values($value);
            }

            if (! $value) {
                continue;
            }

            if ($callback && is_callable($callback)) {
                $query = call_user_func($callback, $query, $value);
            } elseif ($relation) {
                $tables = explode('.', $relation);
                $col = $tables[count($tables) - 1];
                unset($tables[count($tables) - 1]);
                $relation = implode('.', $tables);

                $query = $query->whereRelation($relation, function (Builder $q) use ($col, $range, $method, $operator, $value) {
                    $relTable = $q->getModel()->getTable();
                    if ($range) {
                        return $this->handleRangeQuery($value, $q, $relTable, $col);
                    }
                    if ($operator === 'like') {
                        return $q->{$method}("$relTable.$col", $operator, '%'.$value.'%');
                    }

                    return $q->{$method}("$relTable.$col", $operator, $value);
                });
            } else {
                if ($range) {
                    $query = $this->handleRangeQuery($value, $query, $this->tableName, $field);
                } elseif ($operator == 'like') {
                    $query = $query->{$method}($this->tableName.'.'.$field, $operator, '%'.$value.'%');
                } else {
                    $query = $query->{$method}($this->tableName.'.'.$field, $operator, $value);
                }
            }
        }

        return $query;
    }

    /**
     * @return Builder<MODEL>|MODEL
     */
    private function handleRangeQuery(array $value, Builder $query, string $table, string $column): Builder|Model
    {
        if (count($value) == 2) {
            if (! isset($value[0]) && isset($value[1])) {
                $query = $query->where("$table.$column", '<=', $value[1]);
            } elseif (isset($value[0]) && ! isset($value[1])) {
                $query->where("$table.$column", '>=', $value[0]);
            } elseif (isset($value[0]) && isset($value[1])) {
                $query = $query->where("$table.$column", '>=', $value[0])
                    ->where("$table.$column", '<=', $value[1]);
            }
        } elseif (count($value) > 2) {
            $query->whereIn("$table.$column", array_values(array_filter($value)));
        }

        return $query;
    }

    /**
     * @return Builder<MODEL>|MODEL
     */
    private function orderQueryBy(Builder|Model $query): Builder|Model
    {
        $sortColumns = request('sort_col');
        $sortDir = request()->string('sort_dir', 'asc');
        if (! in_array($sortDir, ['asc', 'desc'])) {
            $sortDir = 'asc';
        }
        $locale = app()->getLocale() ?? 'en';

        if (empty($sortColumns)) {
            return $query->orderBy('created_at', 'desc');
        }
        if (is_array($sortColumns)) {
            foreach ($sortColumns as $col => $dir) {
                if (! in_array($dir, ['asc', 'desc'])) {
                    $dir = 'asc';
                }
                if (in_array($col, $this->columns)) {
                    if (in_array($col, $this->translatables)) {
                        $query->orderByRaw("JSON_EXTRACT($col, '$.$locale') $dir");
                    } else {
                        $query->orderBy($col, $dir);
                    }
                }
            }
        } elseif (in_array($sortColumns, $this->columns)) {
            if (in_array($sortColumns, $this->translatables)) {
                $query->orderByRaw("JSON_EXTRACT($sortColumns, '$.$locale') $sortDir");
            } else {
                $query->orderBy($sortColumns, $sortDir);
            }
        }

        return $query;
    }

    /**
     * @return BaseQuery<MODEL>
     */
    public function counts(array|string $counts): BaseQuery
    {
        $this->counts = [
            ...$this->counts,
            ...Arr::wrap($counts),
        ];

        return $this;
    }

    /**
     * @param class-string<MODEL> $model
     */
    public static function create(string $model): BaseQuery
    {
        return new BaseQuery($model);
    }

    public function filter(): BaseQuery
    {

        $this->query = $this->query->where(function (Builder $builder) {
            return $this->filterFields($builder);
        });

        return $this;
    }

    public static function nullIfEmpty(string|array|null $param = null): string|array|null
    {
        if (empty($param)) {
            return null;
        }
        if (is_array($param)) {
            foreach ($param as $value) {
                if (
                    (is_string($value) && ! empty(trim($value)))
                    || ! empty($value)
                ) {
                    return $param;
                }
            }

            return null;
        } else {
            return $param;
        }
    }

    /**
     * @return BaseQuery<MODEL>
     */
    public function order(): BaseQuery
    {
        $this->query = $this->orderQueryBy($this->query);

        return $this;
    }

    /**
     * @return Builder<MODEL>|MODEL
     */
    public function query(): Model|Builder
    {
        return $this->query
            ->with($this->relations)
            ->withCount($this->counts);
    }

    /**
     * @return BaseQuery<MODEL>
     */
    public function relations(array|string $relations): BaseQuery
    {
        $this->relations = [
            ...$this->relations,
            ...Arr::wrap($relations),
        ];

        return $this;
    }

    /**
     * @return BaseQuery<MODEL>
     */
    public function search(): BaseQuery
    {
        $this->query = $this->query->where(function ($q) {
            return $this->addSearch($q);
        });

        return $this;
    }
}
