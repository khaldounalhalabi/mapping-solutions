<?php

namespace App\Models;

use Carbon\Carbon;
use App\Traits\Sluggable;
use App\Casts\Translatable;
use Database\Factories\VacancyFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Serializers\Translatable as TranslatableSerializer;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

/**
 * @property int                    $id
 * @property TranslatableSerializer $title
 * @property string                 $slug
 * @property TranslatableSerializer $excerpt
 * @property string                 $job_type
 * @property string|null            $location
 * @property Carbon                 $closing_date
 * @property TranslatableSerializer $content
 * @property Carbon                 $created_at
 * @property Carbon                 $updated_at
 *
 * @mixin Builder<Vacancy>
 *
 * @use  HasFactory<VacancyFactory>
 *
 * @property EloquentCollection<JobApplication>|null $jobApplications
 */
#[Fillable([
    'title',
    'slug',
    'excerpt',
    'job_type',
    'location',
    'closing_date',
    'content',
])]
class Vacancy extends Model
{
    use HasFactory, Sluggable;

    protected function casts(): array
    {
        return [
            'title'        => Translatable::class,
            'excerpt'      => Translatable::class,
            'closing_date' => 'datetime',
            'content'      => Translatable::class,
        ];
    }

    public function exportable(): array
    {
        return [
            'title',
            'slug',
            'excerpt',
            'job_type',
            'location',
            'closing_date',
            'content',
            'job_application_ids',
        ];
    }

    /**
     * @return HasMany<JobApplication, static>
     */
    public function jobApplications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    public static function relationsSearchableArray(): array
    {
        return [

        ];
    }

    public static function searchableArray(): array
    {
        return [
            'title',
            'slug',
            'excerpt',
            'job_type',
            'location',
            'content',
        ];
    }

    public function sluggable(): array
    {
        return [
            [
                'col'      => 'title',
                'slug_col' => 'slug',
            ],
        ];
    }
}
