<?php

namespace App\DTOs\v1\ServiceCategory;

use App\Rules\ValidTranslatableJson;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;

class StoreUpdateServiceCategoryDTO extends ValidatedDTO
{
    public string $excerpt;

    public string $icon_key;

    public string $name;

    public string $title;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'name'     => new StringCast,
            'title'    => new StringCast,
            'excerpt'  => new StringCast,
            'icon_key' => new StringCast,
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
            'name'     => ['json', new ValidTranslatableJson, 'required'],
            'title'    => ['json', new ValidTranslatableJson, 'required'],
            'excerpt'  => ['json', new ValidTranslatableJson, 'required'],
            'icon_key' => ['required', 'string', 'max:255', 'min:3'],
        ];
    }
}
