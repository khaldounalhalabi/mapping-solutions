<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use App\Models\NewsletterSubscriber;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin NewsletterSubscriber */
class NewsletterSubscriberResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'    => $this->id,
            'email' => $this->email,
        ];
    }
}
