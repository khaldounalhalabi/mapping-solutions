<?php

namespace App\Http\Resources\v1;

use App\Models\ProductRange;
use Illuminate\Http\Request;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin ProductRange */
class ProductRangeResource extends BaseResource
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
            'label'       => $this->label,
            'range'       => $this->range,
            'colour'      => $this->colour,
            'title'       => $this->title,
            'sort_order'  => $this->sort_order,
            'description' => $this->description,
            'uses'        => $this->uses,
        ];
    }
}
