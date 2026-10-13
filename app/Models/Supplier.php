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
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Serializers\Translatable as TranslatableSerializer;

/**
 * @property int                    $id
 * @property string                 $name
 * @property string                 $slug
 * @property TranslatableSerializer $description
 * @property SerializedMedia|null   $logo
 * @property Carbon                 $created_at
 * @property Carbon                 $updated_at
 *
 * @mixin Builder<Supplier>
 */
#[Fillable([
    'name',
    'slug',
    'description',
    'logo',
])]
class Supplier extends Model
{
    use HasFactory;
    use HasMedia;
    use Sluggable;

    protected function casts(): array
    {
        return [
            'description' => Translatable::class,
            'logo' => MediaCast::single(private: false),
        ];
    }

    public function exportable(): array
    {
        return [
            'name',
            'slug',
            'description',
            'logo',
            'product-family_ids',
            'product_ids',
        ];
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
            'description',
        ];
    }

    public function sluggable(): array
    {
        return [
            [
                'col' => 'name',
                'slug_col' => 'slug',
                'separator' => '-',
            ],
        ];
    }
}
