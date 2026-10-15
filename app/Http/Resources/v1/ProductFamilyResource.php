<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use App\Models\ProductFamily;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin ProductFamily */
class ProductFamilyResource extends BaseResource
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
            'supplier' => SupplierResource::make($this->whenLoaded('supplier')),
            'supplier_id' => $this->supplier_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'products' => ProductResource::collection($this->whenLoaded('products')),
        ];
    }
}
