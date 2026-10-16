<?php

namespace App\Models;

use Carbon\Carbon;
use App\Casts\MediaCast;
use App\Traits\HasMedia;
use App\Traits\Sluggable;
use App\Casts\Translatable;
use App\Serializers\SerializedMedia;
use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Serializers\Translatable as TranslatableSerializer;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

/**
 * @property int                         $id
 * @property int                         $supplier_id
 * @property int|null                    $product_family_id
 * @property int|null                    $product_technology_id
 * @property TranslatableSerializer      $name
 * @property string|null                 $price_note
 * @property string                      $slug
 * @property TranslatableSerializer|null $excerpt
 * @property TranslatableSerializer|null $overview
 * @property TranslatableSerializer|null $key_specs
 * @property TranslatableSerializer|null $specifications
 * @property TranslatableSerializer|null $applications
 * @property string|null                 $external_url
 * @property SerializedMedia|null        $hero_image
 * @property SerializedMedia|null        $specifications_file
 * @property SerializedMedia|null        $datasheet
 * @property SerializedMedia|null        $manual
 * @property SerializedMedia|null        $brochure
 * @property Supplier|null               $supplier
 * @property ProductFamily|null          $productFamily
 * @property ProductTechnology|null      $productTechnology
 * @property Carbon                      $created_at
 * @property Carbon                      $updated_at
 *
 * @mixin Builder<Product>
 *
 * @use  HasFactory<ProductFactory>
 *
 * @property EloquentCollection<Inquiry>|null $inquiries
 */
#[Fillable([
    'supplier_id',
    'product_family_id',
    'product_technology_id',
    'name',
    'price_note',
    'brochure',
    'slug',
    'excerpt',
    'overview',
    'key_specs',
    'specifications',
    'applications',
    'external_url',
    'hero_image',
    'specifications_file',
    'datasheet',
    'manual',
])]
class Product extends Model
{
    use HasFactory, HasMedia, Sluggable;

    protected function casts(): array
    {
        return [
            'name'           => Translatable::class,
            'excerpt'        => Translatable::class,
            'overview'       => Translatable::class,
            'key_specs'      => Translatable::class,
            'specifications' => Translatable::class,
            'applications'   => Translatable::class,

            'brochure'            => MediaCast::single(private: false),
            'hero_image'          => MediaCast::single(private: false),
            'specifications_file' => MediaCast::single(private: false),
            'datasheet'           => MediaCast::single(private: false),
            'manual'              => MediaCast::single(private: false),
        ];
    }

    public function exportable(): array
    {
        return [
            'name',
            'price_note',
            'brochure',
            'slug',
            'excerpt',
            'overview',
            'key_specs',
            'specifications',
            'applications',
            'external_url',
            'hero_image',
            'specifications_file',
            'datasheet',
            'manual',
            'supplier.name',
            'productFamily.name',
            'productTechnology.name',
            'inquiry_ids',

        ];
    }

    /**
     * @return HasMany<Inquiry, static>
     */
    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class);
    }

    /**
     * @return BelongsTo<ProductFamily, static>
     */
    public function productFamily(): BelongsTo
    {
        return $this->belongsTo(ProductFamily::class);
    }

    /**
     * @return BelongsTo<ProductTechnology, static>
     */
    public function productTechnology(): BelongsTo
    {
        return $this->belongsTo(ProductTechnology::class);
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'supplier' => [
                'name',
                'slug',
                'description',
            ],
            'productFamily' => [
                'name',
                'slug',
            ],
            'productTechnology' => [
                'name',
                'slug',
                'icon_key',
            ],
        ];
    }

    public static function searchableArray(): array
    {
        return [
            'name',
            'price_note',
            'slug',
            'excerpt',
            'overview',
            'key_specs',
            'specifications',
            'applications',
            'external_url',
        ];
    }

    public function sluggable(): array
    {
        return [
            [
                'col'      => 'name',
                'slug_col' => 'slug',
            ],
        ];
    }

    /**
     * @return BelongsTo<Supplier, static>
     */
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }
}
