<?php

namespace App\Models;

use Carbon\Carbon;
use App\Casts\Translatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Database\Factories\MarketApplicationFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Serializers\Translatable as TranslatableSerializer;

/**
 * @property int                    $id
 * @property TranslatableSerializer $name
 * @property string                 $icon_key
 * @property string                 $theme_color
 * @property TranslatableSerializer $summary
 * @property TranslatableSerializer $description
 * @property bool                   $is_featured
 * @property Carbon                 $created_at
 * @property Carbon                 $updated_at
 *
 * @mixin Builder<MarketApplication>
 *
 * @use  HasFactory<MarketApplicationFactory>
 */
#[Fillable(['name',
    'icon_key',
    'theme_color',
    'summary',
    'description',
    'is_featured',
    'is_visible',
    'sort_order',
])]
class MarketApplication extends Model
{
    use HasFactory;

    public const int MAX_FEATURED = 4;

    protected function casts(): array
    {
        return [
            'name'        => Translatable::class,
            'summary'     => Translatable::class,
            'description' => Translatable::class,
            'is_featured' => 'boolean',
            'is_visible'  => 'boolean',
            'sort_order'  => 'integer',
        ];
    }

    public function exportable(): array
    {
        return [
            'name',
            'icon_key',
            'theme_color',
            'summary',
            'description',
            'is_featured',
            'is_visible',
            'sort_order',
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
            'icon_key',
            'summary',
            'description',
        ];
    }
}
