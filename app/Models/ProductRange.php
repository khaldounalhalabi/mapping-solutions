<?php

namespace App\Models;

use Carbon\Carbon;
use App\Casts\Translatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Database\Factories\ProductRangeFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property int     $id
 * @property string  $label
 * @property string  $range
 * @property string  $colour
 * @property string  $title
 * @property numeric $sort_order
 * @property string  $description
 * @property string  $uses
 * @property Carbon  $created_at
 * @property Carbon  $updated_at
 *
 * @mixin Builder<ProductRange>
 *
 * @use  HasFactory<ProductRangeFactory>
 */
#[Fillable(['label',
    'range',
    'colour',
    'title',
    'sort_order',
    'description',
    'uses',
])]
class ProductRange extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'sort_order'  => 'integer',
            'title'       => Translatable::class,
            'description' => Translatable::class,
            'uses'        => Translatable::class,
        ];
    }

    public function exportable(): array
    {
        return [
            'label',
            'range',
            'colour',
            'title',
            'sort_order',
            'description',
            'uses',

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
            'label',
            'range',
            'colour',
            'title',
            'description',
            'uses',
        ];
    }
}
