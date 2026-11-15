<?php

namespace App\DTOs\v1\EmailReceiver;

use Illuminate\Validation\Rule;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;

class StoreUpdateEmailReceiverDTO extends ValidatedDTO
{
    public string $email;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'email' => new StringCast,
        ];
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
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'min:6',
                Rule::unique('email_receivers', 'email')->when(
                    request()->isMethod('PUT') || request()->isMethod('PATCH'),
                    fn ($rule) => $rule->ignore(request()->route('email_receiver')),
                ),
            ],
        ];
    }
}
