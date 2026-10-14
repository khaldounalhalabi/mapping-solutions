<?php

namespace App\Models;

use Carbon\Carbon;
use App\Traits\Sluggable;
use App\Casts\Translatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Serializers\Translatable as TranslatableSerializer;

/**
 * @property int                    $id
 * @property int                    $supplier_id
 * @property TranslatableSerializer $name
 * @property string                 $slug
 * @property Supplier|null          $supplier
 * @property Carbon                 $created_at
 * @property Carbon                 $updated_at
 *
 * @mixin Builder<ProductFamily>
 */
#[Fillable([
    'supplier_id',
    'name',
    'slug',
])]
class ProductFamily extends Model
{
    use HasFactory, Sluggable;

    protected function casts(): array
    {
        return [
            'name' => Translatable::class,
        ];
    }

    public function exportable(): array
    {
        return [
            'name',
            'slug',
            'supplier.name',
            'product_ids',
        ];
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'supplier' => ['name', 'slug', 'description'],

        ];
    }

    public static function searchableArray(): array
    {
        return [
            'name',
            'slug',
        ];
    }

    /**
     * @return BelongsTo<Supplier, static>
     */
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function sluggable(): array
    {
        return [
          [
              'col' => 'name',
              'slug_col' => 'slug'
          ]
        ];
    }
}
