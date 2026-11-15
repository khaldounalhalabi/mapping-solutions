<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use App\Models\EmailReceiver;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin EmailReceiver */
class EmailReceiverResource extends BaseResource
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
