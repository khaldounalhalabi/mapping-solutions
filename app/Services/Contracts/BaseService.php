<?php

namespace App\Services\Contracts;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\BaseRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 * @template MODEL of Model
 * @phpstan-consistent-constructor
 */
abstract class BaseService
{
    protected BaseRepository $repository;

    protected string $repositoryClass = BaseRepository::class;

    protected function __construct()
    {
        $this->repository = new $this->repositoryClass;
    }

    /**
     * @param int|string|Model|MODEL $id
     */
    public function delete(Model|int|string $id): ?bool
    {
        return $this->repository->delete($id);
    }

    /**
     * @throws Exception
     */
    public function export(array $ids = []): BinaryFileResponse
    {
        return $this->repository->export($ids);
    }

    /**
     * @throws Exception
     * @throws \PhpOffice\PhpSpreadsheet\Writer\Exception
     */
    public function getImportExample(): BinaryFileResponse
    {
        return $this->repository->getImportExample();
    }

    public function import(): void
    {
        $this->repository->import();
    }

    /**
     * @return Collection<MODEL>
     */
    public function index(array $relations = []): Collection
    {
        return $this->repository->all($relations);
    }

    /**
     * @return LengthAwarePaginator<int , MODEL>
     */
    public function indexWithPagination(array $relations = []): LengthAwarePaginator
    {
        return $this->repository->allWithPagination($relations);
    }

    /**
     * @return MODEL|Model
     */
    public function store(array $data, array $relationships = []): Model
    {
        return $this->repository->create($data, $relationships);
    }

    /**
     * @param  string|int|Model|MODEL $id
     * @return MODEL|null|Model
     */
    public function update(array $data, $id, array $relationships = []): ?Model
    {
        return $this->repository->update($data, $id, $relationships);
    }

    /**
     * @return Model|MODEL|null
     */
    public function view($id, array $relationships = []): ?Model
    {
        return $this->repository->find($id, $relationships);
    }
}
