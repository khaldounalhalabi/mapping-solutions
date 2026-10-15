<?php

namespace App\Http\Resources\v1;

use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin Supplier */
class SupplierResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'name'             => $this->name,
            'slug'             => $this->slug,
            'description'      => $this->description,
            'logo'             => $this->logo,
            'product_families' => ProductFamilyResource::collection($this->whenLoaded('productFamilies')),
            'products'         => ProductResource::collection($this->whenLoaded('products')),
        ];
    }
}
