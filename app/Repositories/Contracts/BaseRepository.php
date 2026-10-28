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
    private static $instance;

    protected Model $model;

    protected string $modelClass = Model::class;

    protected int $perPage = 10;

    public function __construct()
    {
        $this->model = new $this->modelClass;
    }

    /**
     * query that is gonna be used by the frontend filters and searches ...
     *
     * @return BaseQuery<MODEL>
     */
    protected function indexQuery(): BaseQuery
    {
        return BaseQuery::create($this->modelClass)
            ->search()
            ->filter()
            ->order();
    }

    /**
     * utility query
     *
     * @return BaseQuery<MODEL>
     */
    protected function query(): BaseQuery
    {
        return BaseQuery::create($this->modelClass);
    }

    /**
     * @return Collection<MODEL>
     */
    public function all(array $relationships = [], array $counts = []): Collection
    {
        return $this->indexQuery()
            ->relations($relationships)
            ->counts($counts)
            ->query()
            ->get();
    }

    /**
     * @return MODEL|Model
     */
    public function create(array $data, array $relationships = [], array $counts = []): Model
    {
        /** @var MODEL $result */
        $result = $this->modelClass::create($data);

        return $result->load($relationships)
            ->loadCount($counts);
    }

    /**
     * @param string|int|Model|MODEL $id
     */
    public function delete(string|int|Model $id): ?bool
    {
        if ($id instanceof Model) {
            $result = $id;
        } else {
            $result = $this->find($id);
        }

        return $result?->delete();
    }

    /**
     * @throws Exception
     */
    public function export(array $ids = []): BinaryFileResponse
    {
        $collection = $this->query()
            ->query()
            ->when(
                count($ids) > 0,
                fn (Builder $query) => $query->whereIn($this->model->getKeyName(), $ids),
            )
            ->get();

        $requestedColumns = request()->array('columns');

        return Excel::download(
            new BaseExporter($collection, $this->model, $requestedColumns),
            $this->model->getTable().'.xlsx',
        );
    }

    /**
     * @return Model|MODEL|null
     */
    public function find(string|int $id, array $relationships = [], array $counts = []): ?Model
    {
        return $this->query()
            ->relations($relationships)
            ->counts($counts)
            ->query()
            ->whereKey($id)
            ->first();
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
     * @return LengthAwarePaginator<int, MODEL>
     */
    public function paginate(array $relationships = [], array $counts = []): LengthAwarePaginator
    {
        return $this->indexQuery()
            ->relations($relationships)
            ->counts($counts)
            ->query()
            ->paginate($this->perPage);
    }

    /**
     * @param  string|int|Model|MODEL $id
     * @return MODEL|null|Model
     */
    public function update(array $data, string|int|Model $id, array $relationships = [], array $counts = []): ?Model
    {
        if ($id instanceof Model) {
            $item = $id;
        } else {
            $item = $this->find($id);
        }

        if (! $item) {
            return null;
        }

        $item->update($data);

        return $item
            ->refresh()
            ->load($relationships)
            ->loadCount($counts);
    }
}
