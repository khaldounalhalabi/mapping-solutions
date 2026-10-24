<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use App\Models\MarketApplication;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin MarketApplication */
class MarketApplicationResource extends BaseResource
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
            'name'        => $this->name,
            'icon_key'    => $this->icon_key,
            'summary'     => $this->summary,
            'description' => $this->description,
            'is_featured' => $this->is_featured,
        ];
    }
}
