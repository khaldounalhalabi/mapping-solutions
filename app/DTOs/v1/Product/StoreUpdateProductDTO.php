<?php

namespace App\DTOs\v1\Product;

use Illuminate\Validation\Rule;
use Illuminate\Http\UploadedFile;
use App\Rules\MediaValidationRule;
use App\Rules\ValidTranslatableJson;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;
use WendellAdriel\ValidatedDTO\Casting\IntegerCast;

class StoreUpdateProductDTO extends ValidatedDTO
{
    public ?string $applications = null;

    public UploadedFile|array|null $brochure = null;

    public UploadedFile|array|null $datasheet = null;

    public ?string $excerpt = null;

    public ?string $external_url = null;

    public UploadedFile|array|null $hero_image = null;

    public ?string $key_specs = null;

    public UploadedFile|array|null $manual = null;

    public string $name;

    public ?string $overview = null;

    public ?string $price_note = null;

    public ?int $product_family_id = null;

    public ?int $product_technology_id = null;

    public ?string $specifications = null;

    public UploadedFile|array|null $specifications_file = null;

    public int $supplier_id;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'supplier_id'           => new IntegerCast,
            'product_family_id'     => new IntegerCast,
            'product_technology_id' => new IntegerCast,
            'name'                  => new StringCast,
            'price_note'            => new StringCast,
            'slug'                  => new StringCast,
            'excerpt'               => new StringCast,
            'overview'              => new StringCast,
            'key_specs'             => new StringCast,
            'specifications'        => new StringCast,
            'applications'          => new StringCast,
            'external_url'          => new StringCast,
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
            'supplier_id'           => ['numeric', 'required', Rule::exists('suppliers', 'id')],
            'product_family_id'     => ['numeric', 'nullable', Rule::exists('product_families', 'id')],
            'product_technology_id' => ['numeric', 'nullable', Rule::exists('product_technologies', 'id')],
            'name'                  => ['json', new ValidTranslatableJson, 'required'],
            'price_note'            => ['nullable', 'string', 'max:255', 'min:3'],
            'excerpt'               => ['json', new ValidTranslatableJson, 'required'],
            'overview'              => ['json', new ValidTranslatableJson, 'required'],
            'key_specs'             => ['json', new ValidTranslatableJson, 'required'],
            'specifications'        => ['json', new ValidTranslatableJson, 'required'],
            'applications'          => ['json', new ValidTranslatableJson, 'required'],
            'external_url'          => ['nullable', 'max:5000', 'min:0', 'active_url'],
            'hero_image'            => ['nullable', new MediaValidationRule],
            'specifications_file'   => ['nullable', new MediaValidationRule(['file', 'max:10000'])],
            'datasheet'             => ['nullable', new MediaValidationRule(['file', 'max:10000'])],
            'manual'                => ['nullable', new MediaValidationRule(['file', 'max:10000'])],
            'brochure'              => ['nullable', new MediaValidationRule(['file', 'max:10000'])],
        ];
    }
}
