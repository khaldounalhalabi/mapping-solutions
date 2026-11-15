<?php

namespace App\Models;

use Carbon\Carbon;
use App\Casts\Translatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Database\Factories\TrainingCourseFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Serializers\Translatable as TranslatableSerializer;

/**
 * @property int                    $id
 * @property int                    $training_category_id
 * @property TranslatableSerializer $name
 * @property TranslatableSerializer $outline
 * @property TranslatableSerializer $duration
 * @property TranslatableSerializer $level
 * @property bool                   $is_published
 *
 * @method Builder isPublished()
 *
 * @property numeric                $sort_order
 * @property TranslatableSerializer $summary
 * @property TrainingCategory|null  $trainingCategory
 * @property Carbon                 $created_at
 * @property Carbon                 $updated_at
 *
 * @mixin Builder<TrainingCourse>
 *
 * @use  HasFactory<TrainingCourseFactory>
 */
#[Fillable(['training_category_id',
    'name',
    'outline',
    'duration',
    'level',
    'is_published',
    'sort_order',
    'summary',
])]
class TrainingCourse extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'name'         => Translatable::class,
            'outline'      => Translatable::class,
            'duration'     => Translatable::class,
            'level'        => Translatable::class,
            'is_published' => 'boolean',
            'sort_order'   => 'integer',
            'summary'      => Translatable::class,
        ];
    }

    public function exportable(): array
    {
        return [
            'name',
            'outline',
            'duration',
            'level',
            'is_published',
            'sort_order',
            'summary',
            'trainingCategory.name',

        ];
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'trainingCategory' => ['name', 'summary'],

        ];
    }

    public function scopeIsPublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public static function searchableArray(): array
    {
        return [
            'name',
            'outline',
            'duration',
            'level',
            'summary',

        ];
    }

    /**
     * @return BelongsTo<TrainingCategory, static>
     */
    public function trainingCategory(): BelongsTo
    {
        return $this->belongsTo(TrainingCategory::class);
    }
}
