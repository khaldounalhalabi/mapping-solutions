<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Resources\BaseResource\BaseResource;

/**
 * @mixin Role
 */
class RoleResource extends BaseResource
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
        ];
    }
}
