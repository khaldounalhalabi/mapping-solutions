<?php

namespace App\Repositories;

use App\Models\Vacancy;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<Vacancy>
 */
class VacancyRepository extends BaseRepository
{
    protected string $modelClass = Vacancy::class;

    /** @return Collection<int, Vacancy> */
    public function current(): Collection
    {
        return $this->query()
            ->query()
            ->whereDate('closing_date', '>=', today())
            ->latest()
            ->get();
    }

    public function currentBySlug(string $slug): ?Vacancy
    {
        return $this->query()
            ->query()
            ->where('slug', $slug)
            ->whereDate('closing_date', '>=', today())
            ->first();
    }
}
