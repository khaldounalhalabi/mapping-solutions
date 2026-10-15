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

    protected function casts(): array
    {
        return [
            'name'     => new StringCast,
            'icon_key' => new StringCast,
        ];
    }

    protected function defaults(): array
    {
        return [];
    }

    protected function rules(): array
    {
        return [
            'name' => [
                'required',
                'json',
                new ValidTranslatableJson,
            ],

            'icon_key' => [
                'nullable',
                'required_without:icon',
                'prohibits:icon',
                'string',
                'min:3',
                'max:255',
            ],

            'icon' => [
                'nullable',
                'required_without:icon_key',
                'prohibits:icon_key',
                new MediaValidationRule,
            ],
        ];

    }
}
