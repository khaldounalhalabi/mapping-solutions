<?php

namespace App\Models;

use Carbon\Carbon;
use App\Casts\Translatable;
use Database\Factories\ServiceFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Serializers\Translatable as TranslatableSerializer;

/**
 * @property int                    $id
 * @property int                    $service_category_id
 * @property TranslatableSerializer $name
 * @property TranslatableSerializer $summary
 * @property ServiceCategory|null   $serviceCategory
 * @property Carbon                 $created_at
 * @property Carbon                 $updated_at
 *
 * @mixin Builder<Service>
 *
 * @use  HasFactory<ServiceFactory>
 */
#[Fillable([
    'service_category_id',
    'name',
    'summary',
])]
class Service extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'name'    => Translatable::class,
            'summary' => Translatable::class,
        ];
    }

    public function exportable(): array
    {
        return [
            'service_category.name',
            'name',
            'summary',
        ];
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'serviceCategory' => ['name', 'title', 'excerpt', 'icon_key'],
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
     * @return BelongsTo<ServiceCategory, static>
     */
    public function serviceCategory(): BelongsTo
    {
        return $this->belongsTo(ServiceCategory::class);
    }
}
