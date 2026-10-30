<?php

namespace App\DTOs\v1\ProductRange;

use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;
use WendellAdriel\ValidatedDTO\Casting\IntegerCast;

class StoreUpdateProductRangeDTO extends ValidatedDTO
{
    public string $colour;

    public string $description;

    public string $label;

    public string $range;

    public int $sort_order;

    public string $title;

    public string $uses;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'label'       => new StringCast,
            'range'       => new StringCast,
            'colour'      => new StringCast,
            'title'       => new StringCast,
            'sort_order'  => new IntegerCast,
            'description' => new StringCast,
            'uses'        => new StringCast,
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
            'label'       => ['required', 'string', 'max:255', 'min:3'],
            'range'       => ['required', 'string', 'max:255', 'min:3'],
            'colour'      => ['required', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'title'       => ['required', 'string', 'max:255', 'min:3'],
            'sort_order'  => ['required', 'integer', 'min:0'],
            'description' => ['required', 'max:5000', 'min:0'],
            'uses'        => ['required', 'max:5000', 'min:0'],
        ];
    }
}
