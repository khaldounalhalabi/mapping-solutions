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
 * @property TranslatableSerializer $summary
 * @property TranslatableSerializer $description
 * @property Carbon                 $created_at
 * @property Carbon                 $updated_at
 *
 * @mixin Builder<MarketApplication>
 *
 * @use  HasFactory<MarketApplicationFactory>
 */
#[Fillable(['name',
    'icon_key',
    'summary',
    'description',
])]
class MarketApplication extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'name'        => Translatable::class,
            'summary'     => Translatable::class,
            'description' => Translatable::class,
        ];
    }

    public function exportable(): array
    {
        return [
            'name',
            'icon_key',
            'summary',
            'description',
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
