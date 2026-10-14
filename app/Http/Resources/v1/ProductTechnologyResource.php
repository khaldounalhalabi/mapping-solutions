<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use App\Models\ProductTechnology;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin ProductTechnology */
class ProductTechnologyResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'icon_key' => $this->icon_key,
            'icon' => $this->icon,
        ];
    }
}
