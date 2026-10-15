<?php

namespace App\Models;

use Carbon\Carbon;
use App\Casts\MediaCast;
use App\Traits\HasMedia;
use App\Serializers\SerializedMedia;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use App\Observers\NewsletterEmailObserver;
use Database\Factories\NewsletterEmailFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;

/**
 * @property int                    $id
 * @property string                 $title
 * @property string                 $content
 * @property SerializedMedia[]|null $attachments
 * @property Carbon                 $created_at
 * @property Carbon                 $updated_at
 *
 * @mixin Builder<NewsletterEmail>
 *
 * @use  HasFactory<NewsletterEmailFactory>
 */
#[Fillable([
    'title',
    'content',
    'attachments',
])]
#[ObservedBy([NewsletterEmailObserver::class])]
class NewsletterEmail extends Model
{
    use HasFactory, HasMedia;

    protected function casts(): array
    {
        return [
            'attachments' => MediaCast::array(private: false),
        ];
    }

    public function exportable(): array
    {
        return [
            'title',
            'content',
            'attachments',
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
            'title',
            'content',
        ];
    }
}
