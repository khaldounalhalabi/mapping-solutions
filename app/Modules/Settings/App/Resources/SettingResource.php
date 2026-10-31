<?php

namespace App\Modules\Settings\App\Resources;

use Illuminate\Http\Request;
use App\Modules\Settings\App\Models\Setting;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Setting
 */
class SettingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'key'         => $this->key,
            'label'       => $this->label,
            'description' => $this->description,
            'value'       => $this->value,
            'structure'   => $this->structure,
        ];
    }
}
