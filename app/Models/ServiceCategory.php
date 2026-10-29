<?php

namespace App\Models;

use Carbon\Carbon;
use App\Casts\Translatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Database\Factories\ServiceCategoryFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Serializers\Translatable as TranslatableSerializer;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

/**
 * @property int                    $id
 * @property TranslatableSerializer $name
 * @property TranslatableSerializer $title
 * @property TranslatableSerializer $excerpt
 * @property string                 $icon_key
 * @property Carbon                 $created_at
 * @property Carbon                 $updated_at
 *
 * @mixin Builder<ServiceCategory>
 *
 * @use  HasFactory<ServiceCategoryFactory>
 *
 * @property EloquentCollection<Service>|null $services
 */
#[Fillable([
    'name',
    'title',
    'excerpt',
    'icon_key',
])]
class ServiceCategory extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'name'    => Translatable::class,
            'title'   => Translatable::class,
            'excerpt' => Translatable::class,
        ];
    }

    public function exportable(): array
    {
        return [
            'name',
            'title',
            'excerpt',
            'icon_key',
            'service_ids',
        ];
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'services' => ['name', 'summary'],
        ];
    }

    public static function searchableArray(): array
    {
        return [
            'name',
            'title',
            'excerpt',
            'icon_key',
        ];
    }

    /**
     * @return HasMany<Service, static>
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }
}
