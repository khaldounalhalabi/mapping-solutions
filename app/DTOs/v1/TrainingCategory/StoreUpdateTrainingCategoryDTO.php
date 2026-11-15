<?php

namespace App\DTOs\v1\TrainingCategory;

use App\Rules\ValidTranslatableJson;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;
use WendellAdriel\ValidatedDTO\Casting\IntegerCast;

class StoreUpdateTrainingCategoryDTO extends ValidatedDTO
{
    public string $name;

    public int $sort_order;

    public string $summary;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'name'       => new StringCast,
            'sort_order' => new IntegerCast,
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
            'name'       => ['json', new ValidTranslatableJson, 'required'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:2147483647'],
            'summary'    => ['json', new ValidTranslatableJson, 'required'],
        ];
    }
}
