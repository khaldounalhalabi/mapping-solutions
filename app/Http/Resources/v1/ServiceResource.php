<?php

namespace App\Http\Resources\v1;

use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin Service */
class ServiceResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'group'      => $this->group,
            'group_icon' => $this->group_icon,
            'name'       => $this->name,
            'summary'    => $this->summary,
        ];
    }
}
