<?php

namespace App\DTOs\v1\Supplier;

use Illuminate\Http\UploadedFile;
use App\Rules\MediaValidationRule;
use App\Rules\ValidTranslatableJson;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;

class StoreUpdateSupplierDTO extends ValidatedDTO
{
    public string $description;

    public ?UploadedFile $logo = null;

    public string $name;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'name' => new StringCast,
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
            'name' => ['required', 'string', 'max:255', 'min:3'],
            'description' => ['json', new ValidTranslatableJson, 'required'],
            'logo' => ['nullable', new MediaValidationRule],
        ];
    }
}
