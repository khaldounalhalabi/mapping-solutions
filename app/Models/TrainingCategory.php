<?php

namespace App\Models;

use Carbon\Carbon;
use App\Casts\Translatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Database\Factories\TrainingCategoryFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Serializers\Translatable as TranslatableSerializer;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

/**
 * @property int                    $id
 * @property TranslatableSerializer $name
 * @property numeric                $sort_order
 * @property TranslatableSerializer $summary
 * @property Carbon                 $created_at
 * @property Carbon                 $updated_at
 *
 * @mixin Builder<TrainingCategory>
 *
 * @use  HasFactory<TrainingCategoryFactory>
 *
 * @property EloquentCollection<TrainingCourse>|null $trainingCourses
 */
#[Fillable([
    'name',
    'sort_order',
    'summary',
])]
class TrainingCategory extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'name'       => Translatable::class,
            'sort_order' => 'integer',
            'summary'    => Translatable::class,
        ];
    }

    public function exportable(): array
    {
        return [
            'name',
            'sort_order',
            'summary',

        ];
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'trainingCourses' => [
                'name',
                'outline',
                'duration',
                'level',
                'summary',
            ],
        ];
    }

    public static function searchableArray(): array
    {
        return [
            'name',
            'summary',

        ];
    }

    /**
     * @return HasMany<TrainingCourse, static>
     */
    public function trainingCourses(): HasMany
    {
        return $this->hasMany(TrainingCourse::class);
    }
}
