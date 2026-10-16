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
 * @property Product|null $product
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
])]
class Inquiry extends Model
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
