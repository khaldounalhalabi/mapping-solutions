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
use Database\Factories\NewsArticleFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Serializers\Translatable as TranslatableSerializer;

/**
 * @property int                    $id
 * @property int                    $news_category_id
 * @property TranslatableSerializer $title
 * @property string                 $slug
 * @property TranslatableSerializer $excerpt
 * @property TranslatableSerializer $content
 * @property SerializedMedia|null   $hero_image
 * @property NewsCategory|null      $newsCategory
 * @property Carbon                 $created_at
 * @property Carbon                 $updated_at
 *
 * @mixin Builder<NewsArticle>
 *
 * @use  HasFactory<NewsArticleFactory>
 */
#[Fillable([
    'news_category_id',
    'title',
    'slug',
    'excerpt',
    'content',
    'hero_image',
])]
class NewsArticle extends Model
{
    use HasFactory, HasMedia, Sluggable;

    protected function casts(): array
    {
        return [
            'title'      => Translatable::class,
            'excerpt'    => Translatable::class,
            'content'    => Translatable::class,
            'hero_image' => MediaCast::single(private: false),
        ];
    }

    public function exportable(): array
    {
        return [
            'title',
            'slug',
            'excerpt',
            'content',
            'hero_image',
            'news_category.name',

        ];
    }

    /**
     * @return BelongsTo<NewsCategory, static>
     */
    public function newsCategory(): BelongsTo
    {
        return $this->belongsTo(NewsCategory::class);
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'newsCategory' => ['name', 'slug'],

        ];
    }

    public static function searchableArray(): array
    {
        return [
            'title',
            'slug',
            'excerpt',
            'content',
        ];
    }

    public function sluggable(): array
    {
        return [
            [
                'col'      => 'title',
                'slug_col' => 'slug',
            ],
        ];
    }
}
