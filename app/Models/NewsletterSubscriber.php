<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Database\Factories\NewsletterSubscriberFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property int    $id
 * @property string $email
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @mixin Builder<NewsletterSubscriber>
 *
 * @use  HasFactory<NewsletterSubscriberFactory>
 */
#[Fillable([
    'email',
])]
class NewsletterSubscriber extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [

        ];
    }

    public function exportable(): array
    {
        return [
            'email',

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
            'email',

        ];
    }
}
