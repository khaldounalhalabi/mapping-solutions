<?php

namespace App\DTOs\v1\MarketApplication;

use App\Rules\ValidTranslatableJson;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;

class StoreUpdateMarketApplicationDTO extends ValidatedDTO
{
    public string $description;

    public string $icon_key;

    public string $name;

    public string $summary;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'name' => new StringCast,
            'icon_key' => new StringCast,
            'summary' => new StringCast,
            'description' => new StringCast,
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
            'name' => ['json', new ValidTranslatableJson, 'required'],
            'icon_key' => ['required', 'string', 'max:255', 'min:3'],
            'summary' => ['json', new ValidTranslatableJson, 'required'],
            'description' => ['json', new ValidTranslatableJson, 'required'],
        ];
    }
}
