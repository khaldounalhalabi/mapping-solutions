<?php

namespace App\Models;

use Carbon\Carbon;
use App\Traits\Sluggable;
use App\Casts\Translatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Database\Factories\NewsCategoryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Serializers\Translatable as TranslatableSerializer;

/**
 * @property int                    $id
 * @property TranslatableSerializer $name
 * @property string                 $slug
 * @property Carbon                 $created_at
 * @property Carbon                 $updated_at
 *
 * @mixin Builder<NewsCategory>
 *
 * @use  HasFactory<NewsCategoryFactory>
 */
#[Fillable([
    'name',
    'slug',
])]
class NewsCategory extends Model
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
            'news-article_ids',
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
}
