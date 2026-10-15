<?php

namespace App\Models;

use Carbon\Carbon;
use App\Traits\Sluggable;
use App\Casts\Translatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Database\Factories\NewsCategoryFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Serializers\Translatable as TranslatableSerializer;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

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
 *
 * @property EloquentCollection<NewsArticle>|null $newsArticles
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

    /**
     * @return HasMany<NewsArticle, static>
     */
    public function newsArticles(): HasMany
    {
        return $this->hasMany(NewsArticle::class);
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'newsArticles' => [
                'title',
                'slug',
                'excerpt',
                'content',
            ],
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
