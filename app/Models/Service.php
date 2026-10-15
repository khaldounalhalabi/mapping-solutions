<?php

namespace App\Models;

use Carbon\Carbon;
use App\Casts\Translatable;
use Database\Factories\ServiceFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Serializers\Translatable as TranslatableSerializer;

/**
 * @property int                    $id
 * @property TranslatableSerializer $group
 * @property TranslatableSerializer $name
 * @property TranslatableSerializer $summary
 * @property Carbon                 $created_at
 * @property Carbon                 $updated_at
 *
 * @mixin Builder<Service>
 *
 * @use  HasFactory<ServiceFactory>
 */
#[Fillable(['group',
    'name',
    'summary',
])]
class Service extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'group' => Translatable::class,
            'name' => Translatable::class,
            'summary' => Translatable::class,
        ];
    }

    public function exportable(): array
    {
        return [
            'group',
            'name',
            'summary',
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
            'group',
            'name',
            'summary',
        ];
    }
}
