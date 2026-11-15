<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Database\Factories\EmailReceiverFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property int    $id
 * @property string $email
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @mixin Builder<EmailReceiver>
 *
 * @use  HasFactory<EmailReceiverFactory>
 */
#[Fillable(['email'])]
class EmailReceiver extends Model
{
    use HasFactory;

    public function exportable(): array
    {
        return ['email'];
    }

    public static function relationsSearchableArray(): array
    {
        return [];
    }

    public static function searchableArray(): array
    {
        return ['email'];
    }
}
