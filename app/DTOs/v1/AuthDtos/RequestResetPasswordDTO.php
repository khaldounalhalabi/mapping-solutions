<?php

namespace App\DTOs\v1\AuthDtos;

use WendellAdriel\ValidatedDTO\ValidatedDTO;

class RequestResetPasswordDTO extends ValidatedDTO
{
    public string $email;

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
            'email' => 'required|email|exists:users,email|min:3|max:255',
        ];
    }
}
