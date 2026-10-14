<?php

namespace App\DTOs\v1\ProductTechnology;

use Illuminate\Http\UploadedFile;
use App\Rules\MediaValidationRule;
use App\Rules\ValidTranslatableJson;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;

class StoreUpdateProductTechnologyDTO extends ValidatedDTO
{
    public ?UploadedFile $icon = null;

    public ?string $icon_key = null;

    public string $name;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'name' => new StringCast,
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
            'name' => ['json', new ValidTranslatableJson, 'required'],
            'icon_key' => ['nullable', 'string', 'max:255', 'min:3'],
            'icon' => ['nullable', new MediaValidationRule],
        ];
    }
}
