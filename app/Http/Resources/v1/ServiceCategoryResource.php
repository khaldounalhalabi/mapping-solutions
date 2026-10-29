<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use App\Models\ServiceCategory;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin ServiceCategory */
class ServiceCategoryResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'       => $this->id,
            'name'     => $this->name,
            'title'    => $this->title,
            'excerpt'  => $this->excerpt,
            'icon_key' => $this->icon_key,
            'services' => ServiceResource::collection($this->whenLoaded('services')),
        ];
    }
}
