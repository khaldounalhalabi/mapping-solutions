<?php

namespace App\Repositories\Contracts;

use App\Excel\BaseExporter;
use App\Excel\BaseImporter;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Database\Eloquent\Model;
use PhpOffice\PhpSpreadsheet\Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use PhpOffice\PhpSpreadsheet\Writer\Exception as SpreadSheetException;

/**
 * @phpstan-consistent-constructor
 *
 * @template MODEL of Model
 */
abstract class BaseRepository
{
    private array $filterKeys = [];

    private static $instance;

    private array $modelTableColumns;

    private array $relationSearchableKeys = [];

    private array $searchableKeys = [];

    private string $tableName;

    protected Model $model;

    protected string $modelClass = Model::class;

    protected int $perPage = 10;

    public function __construct()
    {
        $this->model = new $this->modelClass;
        $this->tableName = $this->model->getTable();

        if (method_exists($this->model, 'searchableArray')) {
            $this->searchableKeys = $this->model->searchableArray();
        }

        if (method_exists($this->model, 'relationsSearchableArray')) {
            $this->relationSearchableKeys = $this->model->relationsSearchableArray();
        }

        if (method_exists($this->model, 'filterArray')) {
            $this->filterKeys = $this->model->filterArray();
        }

        $this->modelTableColumns = $this->getTableColumns();
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
            $value = $this->unsetEmptyParams($value);
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
    private function orderQueryBy($query): Builder|Model
    {
        $sortColumns = request('sort_col');
        $sortDir = request()->string('sort_dir', 'asc');
        if (empty($sortColumns)) {
            return $query->orderBy('created_at', 'desc');
        }
        if (is_array($sortColumns)) {
            foreach ($sortColumns as $col => $dir) {
                if (in_array($col, $this->modelTableColumns)) {
                    $query->orderBy($col, $dir);
                }
            }
        } elseif (in_array($sortColumns, $this->modelTableColumns)) {
            $query->orderBy($sortColumns, $sortDir);
        }

        return $query;

    }

    protected function unsetEmptyParams(string|array|null $param = null): string|array|null
    {
        if (! $param) {
            return null;
        }
        if (is_array($param)) {
            foreach ($param as $value) {
                if (strlen(trim(preg_replace('/\s+/', '', $value))) != 0) {
                    return $param;
                }
            }

            return null;
        } elseif (strlen(trim(preg_replace('/\s+/', '', $param))) == 0) {
            return null;
        } else {
            return $param;
        }
    }

    /**
     * @return Collection<MODEL>
     */
    public function all(array $relationships = []): Collection
    {
        return $this->globalQuery($relationships)->get();
    }

    /**
     * @return LengthAwarePaginator<int, MODEL>
     */
    public function allWithPagination(array $relationships = []): LengthAwarePaginator
    {
        return $this->globalQuery($relationships)->paginate($this->perPage);
    }

    /**
     * @return MODEL|Model
     */
    public function create(array $data, array $relationships = []): Model
    {
        $result = $this->model->create($data);
        $result->refresh();

        return $result->load($relationships);
    }

    /**
     * @param string|int|Model|MODEL $id
     */
    public function delete(string|int|Model $id): ?bool
    {
        if ($id instanceof Model) {
            $result = $id;
        } else {
            $result = $this->modelClass::find($id);
        }

        return $result?->delete();
    }

    /**
     * @throws Exception
     */
    public function export(array $ids = []): BinaryFileResponse
    {
        if (! count($ids)) {
            $collection = $this->globalQuery()->get();
        } else {
            $collection = $this->globalQuery()->whereIn('id', $ids)->get();
        }

        $requestedColumns = request('columns') ?? null;

        return Excel::download(
            new BaseExporter($collection, $this->model, $requestedColumns),
            $this->model->getTable().'.xlsx',
        );
    }

    /**
     * @return Model|MODEL|null
     */
    public function find(string|int $id, array $relationships = []): ?Model
    {
        $result = $this->model->with($relationships)->find($id);

        if ($result) {
            return $result;
        }

        return null;
    }

    /**
     * @throws SpreadSheetException
     * @throws Exception
     */
    public function getImportExample(): BinaryFileResponse
    {
        return Excel::download(
            new BaseExporter(collect(), $this->model, null, true),
            $this->model->getTable().'-example.xlsx',
        );
    }

    public function getTableColumns(): array
    {
        return $this->model->getFillable();
    }

    /**
     * @return Builder<MODEL>|MODEL
     */
    public function globalQuery(array $relations = []): Builder|Model
    {
        $query = $this->model->with($relations);

        if (request()->isMethod('GET')) {
            $query = $query->where(function (Builder $builder) {
                return $this->filterFields($builder);
            });
            $query = $query->where(function ($q) {
                return $this->addSearch($q);
            });
            $query = $this->orderQueryBy($query);
        }

        return $query;
    }

    public function import(): void
    {
        Excel::import(new BaseImporter($this->model), request()->file('excel_file'));
    }

    public static function make(): static
    {
        if (is_null(self::$instance)) {
            self::$instance = new static;
        } elseif (! (self::$instance instanceof static)) {
            self::$instance = new static;
        }

        self::$instance->perPage = request()->integer('limit', 10);

        return self::$instance;
    }

    /**
     * @param  string|int|Model|MODEL $id
     * @return MODEL|null|Model
     */
    public function update(array $data, string|int|Model $id, array $relationships = []): ?Model
    {
        if ($id instanceof Model) {
            $item = $id;
        } else {
            $item = $this->modelClass::find($id);
        }

        if (! $item) {
            return null;
        }

        $item->update($data);

        return $item->refresh()->load($relationships);
    }
}
