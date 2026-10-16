<?php

namespace App\Http\Resources\v1;

use App\Models\Inquiry;
use Illuminate\Http\Request;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin Inquiry */
class InquiryResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'product'    => ProductResource::make($this->whenLoaded('product')),
            'product_id' => $this->product_id,
            'first_name' => $this->first_name,
            'last_name'  => $this->last_name,
            'company'    => $this->company,
            'country'    => $this->country,
            'email'      => $this->email,
            'phone'      => $this->phone,
            'subject'    => $this->subject,
            'message'    => $this->message,
        ];
    }
}
