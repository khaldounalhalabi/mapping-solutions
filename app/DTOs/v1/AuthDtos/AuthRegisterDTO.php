<?php

namespace App\DTOs\v1\AuthDtos;

use WendellAdriel\ValidatedDTO\ValidatedDTO;

class AuthRegisterDTO extends ValidatedDTO
{
    public string $email;

    public string $first_name;

    public string $last_name;

    public string $password;

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
        return [];
    }

    /**
     * Get the validation rules that apply to the DTO.
     */
    protected function rules(): array
    {
        return [
            'first_name' => 'required|string|min:3|max:255',
            'last_name'  => 'required|string|min:3|max:255',
            'email'      => 'required|email|unique:users,email|min:3|max:255',
            'password'   => 'required|min:8|confirmed|max:255',
        ];
    }
}
