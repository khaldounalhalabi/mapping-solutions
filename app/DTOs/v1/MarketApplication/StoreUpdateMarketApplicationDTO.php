<?php

namespace App\DTOs\v1\MarketApplication;

use App\Rules\ValidTranslatableJson;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use App\Rules\MaximumFeaturedMarketApplications;
use WendellAdriel\ValidatedDTO\Casting\StringCast;
use WendellAdriel\ValidatedDTO\Casting\BooleanCast;
use WendellAdriel\ValidatedDTO\Casting\IntegerCast;

class StoreUpdateMarketApplicationDTO extends ValidatedDTO
{
    public string $description;

    public string $icon_key;

    public bool $is_featured;

    public bool $is_visible;

    public string $name;

    public int $sort_order;

    public string $summary;

    public string $theme_color;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'name'        => new StringCast,
            'icon_key'    => new StringCast,
            'theme_color' => new StringCast,
            'summary'     => new StringCast,
            'description' => new StringCast,
            'is_featured' => new BooleanCast,
            'is_visible'  => new BooleanCast,
            'sort_order'  => new IntegerCast,
        ];
    }

    /**
     * Get the default values for the DTO properties.
     */
    protected function defaults(): array
    {
        return [
            'is_featured' => false,
            'is_visible'  => true,
            'sort_order'  => 0,
        ];
    }

    /**
     * Get the validation rules that apply to the DTO.
     */
    protected function rules(): array
    {
        return [
            'is_visible'  => ['boolean'],
            'sort_order'  => ['integer', 'min:0', 'max:100000'],
            'name'        => ['json', new ValidTranslatableJson, 'required'],
            'icon_key'    => ['required', 'string', 'max:255', 'min:3'],
            'theme_color' => ['required', 'hex_color'],
            'summary'     => ['json', new ValidTranslatableJson, 'required'],
            'description' => ['json', new ValidTranslatableJson, 'required'],
            'is_featured' => [
                'sometimes',
                'boolean',
                new MaximumFeaturedMarketApplications(request()->route('market_application')),
            ],
        ];
    }
}
