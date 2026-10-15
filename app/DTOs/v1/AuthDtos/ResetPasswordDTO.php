<?php

namespace App\DTOs\v1\AuthDtos;

use WendellAdriel\ValidatedDTO\ValidatedDTO;

class ResetPasswordDTO extends ValidatedDTO
{
    public string $password;

    public string $reset_password_code;

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
            'reset_password_code' => 'required|string|exists:users,reset_password_code|max:8',
            'password' => 'required|string|min:8|max:255|confirmed',
        ];
    }
}
