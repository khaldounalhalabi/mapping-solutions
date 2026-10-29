<?php

namespace App\DTOs\v1\Service;

use Illuminate\Validation\Rule;
use App\Rules\ValidTranslatableJson;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;

class StoreUpdateServiceDTO extends ValidatedDTO
{
    public string $name;

    public int $service_category_id;

    public string $summary;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'name'    => new StringCast,
            'summary' => new StringCast,
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
            'service_category_id' => ['required', 'integer', Rule::exists('service_categories', 'id')],
            'name'                => ['json', new ValidTranslatableJson, 'required'],
            'summary'             => ['json', new ValidTranslatableJson, 'required'],
        ];
    }
}
