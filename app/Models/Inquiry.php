<?php

namespace App\Models;

use Carbon\Carbon;
use Database\Factories\InquiryFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property int          $id
 * @property int|null     $product_id
 * @property string       $first_name
 * @property string       $last_name
 * @property string       $company
 * @property string       $country
 * @property string       $email
 * @property string       $phone
 * @property string       $subject
 * @property string       $message
 * @property string|null  $response_subject
 * @property string|null  $response_message
 * @property int|null     $responded_by_id
 * @property Carbon|null  $responded_at
 * @property Product|null $product
 * @property User|null    $respondedBy
 * @property Carbon       $created_at
 * @property Carbon       $updated_at
 *
 * @mixin Builder<Inquiry>
 *
 * @use  HasFactory<InquiryFactory>
 */
#[Fillable(['product_id',
    'first_name',
    'last_name',
    'company',
    'country',
    'email',
    'phone',
    'subject',
    'message',
    'response_subject',
    'response_message',
    'responded_by_id',
    'responded_at',
])]
class Inquiry extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'responded_at' => 'datetime',
        ];
    }

    public function exportable(): array
    {
        return [
            'first_name',
            'last_name',
            'company',
            'country',
            'email',
            'phone',
            'subject',
            'message',
            'product.name',

        ];
    }

    /**
     * @return BelongsTo<Product, static>
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'product' => [
                'name',
            ],

        ];
    }

    /**
     * @return BelongsTo<User, static>
     */
    public function respondedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responded_by_id');
    }

    public static function searchableArray(): array
    {
        return [
            'first_name',
            'last_name',
            'company',
            'country',
            'email',
            'phone',
            'subject',
            'message',
        ];
    }
}
