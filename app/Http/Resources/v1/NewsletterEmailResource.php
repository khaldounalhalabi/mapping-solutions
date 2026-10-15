<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use App\Models\NewsletterEmail;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin NewsletterEmail */
class NewsletterEmailResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'content'     => $this->content,
            'attachments' => $this->attachments,
        ];
    }
}
