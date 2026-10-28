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
            'id'              => $this->id,
            'name'            => $this->name,
            'slug'            => $this->slug,
            'color'           => $this->color,
            'icon_key'        => $this->icon_key,
            'icon'            => $this->icon,
            'products'        => ProductResource::collection($this->whenLoaded('products')),
            'suppliers_count' => $this->whenCounted('suppliers_count'),
            'products_count'  => $this->whenCounted('products'),
            'suppliers'       => SupplierResource::collection($this->whenLoaded('suppliers')),
        ];
    }
}
