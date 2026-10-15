<?php

namespace App\DTOs\v1\AuthDtos;

use Illuminate\Validation\Rule;
use WendellAdriel\ValidatedDTO\ValidatedDTO;

class UpdateUserDTO extends ValidatedDTO
{
    public string $email;

    public string $first_name;

    public string $last_name;

    public ?string $password;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [];
    }

    /**
     * Get the default values for the DTO properties.
     */
    protected function defaults(): array
    {
        return [
            'password' => null,
        ];
    }

    /**
     * Get the validation rules that apply to the DTO.
     */
    protected function rules(): array
    {
        $guard = request()->acceptsHtml() ? 'web' : 'api';

        return [
            'first_name' => 'required|string|min:3|max:255',
            'last_name' => 'required|string|min:3|max:255',
            'email' => 'required|min:3|max:255|email|unique:users,email,'.auth($guard)->user()?->id,
            'password' => [
                'nullable',
                'min:8',
                'max:255',
                'confirmed',
                Rule::excludeIf(fn () => empty($this->dtoData['password'] ?? null)),
            ],
        ];
    }
}
