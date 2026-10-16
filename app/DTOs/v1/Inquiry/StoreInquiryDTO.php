<?php

namespace App\DTOs\v1\Inquiry;

use Illuminate\Validation\Rule;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;
use WendellAdriel\ValidatedDTO\Casting\IntegerCast;

class StoreInquiryDTO extends ValidatedDTO
{
    public string $company;

    public string $country;

    public string $email;

    public string $first_name;

    public string $last_name;

    public string $message;

    public string $phone;

    public ?int $product_id = null;

    public string $subject;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'product_id' => new IntegerCast,
            'first_name' => new StringCast,
            'last_name'  => new StringCast,
            'company'    => new StringCast,
            'country'    => new StringCast,
            'email'      => new StringCast,
            'phone'      => new StringCast,
            'subject'    => new StringCast,
            'message'    => new StringCast,
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
            'product_id' => ['numeric', 'nullable', Rule::exists('products', 'id')],
            'first_name' => ['required', 'string', 'max:255', 'min:3'],
            'last_name'  => ['required', 'string', 'max:255', 'min:3'],
            'company'    => ['required', 'string', 'max:255', 'min:3'],
            'country'    => ['required', 'string', 'max:255', 'min:3'],
            'email'      => ['required', 'string', 'max:255', 'email', 'min:6'],
            'phone'      => ['required', 'string', 'max:255', 'min:3'],
            'subject'    => ['required', 'string', 'max:255', 'min:3'],
            'message'    => ['required', 'max:5000', 'min:0'],
        ];
    }
}
