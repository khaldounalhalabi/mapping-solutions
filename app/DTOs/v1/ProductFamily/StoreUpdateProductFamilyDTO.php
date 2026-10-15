<?php

namespace App\DTOs\v1\ProductFamily;

use Illuminate\Validation\Rule;
use App\Rules\ValidTranslatableJson;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;
use WendellAdriel\ValidatedDTO\Casting\IntegerCast;

class StoreUpdateProductFamilyDTO extends ValidatedDTO
{
    public string $name;

    public int $supplier_id;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'supplier_id' => new IntegerCast,
            'name'        => new StringCast,
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
            'supplier_id' => ['numeric', 'required', Rule::exists('suppliers', 'id')],
            'name'        => ['json', new ValidTranslatableJson, 'required'],
        ];
    }
}
