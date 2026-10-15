<?php

namespace App\DTOs\v1\NewsletterSubscriber;

use Illuminate\Validation\Rule;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;

class StoreUpdateNewsletterSubscriberDTO extends ValidatedDTO
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
        return [

        ];
    }

    /**
     * Get the validation rules that apply to the DTO.
     */
    protected function rules(): array
    {
        return [
            'email' => [
                'required',
                Rule::unique('newsletter_subscribers', 'email')
                    ->when(
                        request()->isMethod('PUT'),
                        fn ($rule) => $rule->ignore(request()->route('newsletter_subscriber')),
                    ),
                'string',
                'max:255',
                'email',
                'min:6'],
        ];
    }
}
