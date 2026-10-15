<?php

namespace App\Models;

use Carbon\Carbon;
use App\Casts\MediaCast;
use App\Traits\HasMedia;
use App\Traits\Sluggable;
use App\Casts\Translatable;
use App\Serializers\SerializedMedia;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Database\Factories\ProductTechnologyFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Serializers\Translatable as TranslatableSerializer;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

/**
 * @property int                    $id
 * @property TranslatableSerializer $name
 * @property string                 $slug
 * @property string|null            $icon_key
 * @property SerializedMedia|null   $icon
 * @property Carbon                 $created_at
 * @property Carbon                 $updated_at
 *
 * @mixin Builder<ProductTechnology>
 *
 * @use  HasFactory<ProductTechnologyFactory>
 *
 * @property EloquentCollection<Product>|null $products
 */
#[Fillable([
    'name',
    'slug',
    'icon_key',
    'icon',
])]
class ProductTechnology extends Model
{
    use HasFactory, HasMedia, Sluggable;

    protected function casts(): array
    {
        return [
            'name' => Translatable::class,
            'icon' => MediaCast::single(private: false),
        ];
    }

    public function exportable(): array
    {
        return [
            'name',
            'slug',
            'icon_key',
            'icon',
            'product_ids',

        ];
    }

    /**
     * @return HasMany<Product, static>
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public static function relationsSearchableArray(): array
    {
        return [

        ];
    }

    public static function searchableArray(): array
    {
        return [
            'name',
            'slug',
            'icon_key',

        ];
    }

    /**
     * {@inheritDoc}
     */
    public function sluggable(): array
    {
        return [
            [
                'col' => 'name',
                'slug_col' => 'slug',
            ],
        ];
    }
}
