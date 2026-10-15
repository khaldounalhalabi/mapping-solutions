<?php

namespace App\Http\Resources\v1;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin Product */
class ProductResource extends BaseResource
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
            'supplier_id' => $this->supplier_id,
            'product_family_id' => $this->product_family_id,
            'product_technology_id' => $this->product_technology_id,
            'name' => $this->name,
            'price_note' => $this->price_note,
            'brochure' => $this->brochure,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'overview' => $this->overview,
            'key_specs' => $this->key_specs,
            'specifications' => $this->specifications,
            'applications' => $this->applications,
            'external_url' => $this->external_url,
            'hero_image' => $this->hero_image,
            'specifications_file' => $this->specifications_file,
            'datasheet' => $this->datasheet,
            'manual' => $this->manual,
            'supplier' => SupplierResource::make($this->whenLoaded('supplier')),
            'product_family' => ProductFamilyResource::make($this->whenLoaded('productFamily')),
            'product_technology' => ProductTechnologyResource::make($this->whenLoaded('productTechnology')),
        ];
    }
}
