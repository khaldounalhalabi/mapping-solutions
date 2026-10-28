<?php

namespace App\DTOs\v1\Service;

use App\Rules\ValidTranslatableJson;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;

class StoreUpdateServiceDTO extends ValidatedDTO
{
    public string $group;

    public string $group_icon;

    public string $name;

    public string $summary;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'group'      => new StringCast,
            'group_icon' => new StringCast,
            'name'       => new StringCast,
            'summary'    => new StringCast,
        ];
    }

    /**
     * Get the default values for the DTO properties.
     */
    protected function defaults(): array
    {
        return [

        ];
    }

    /**
     * Get the validation rules that apply to the DTO.
     */
    protected function rules(): array
    {
        return [
            'group'      => ['json', new ValidTranslatableJson, 'required'],
            'group_icon' => ['required', 'string', 'max:255', 'min:3'],
            'name'       => ['json', new ValidTranslatableJson, 'required'],
            'summary'    => ['json', new ValidTranslatableJson, 'required'],
        ];
    }
}
