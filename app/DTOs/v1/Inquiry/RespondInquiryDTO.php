<?php

namespace App\DTOs\v1\Inquiry;

use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;

class RespondInquiryDTO extends ValidatedDTO
{
    public string $message;

    public string $subject;

    protected function casts(): array
    {
        return [
            'message' => new StringCast,
            'subject' => new StringCast,
        ];
    }

    protected function defaults(): array
    {
        return [];
    }

    protected function rules(): array
    {
        return [
            'message' => ['required', 'string', 'max:5000'],
            'subject' => ['required', 'string', 'max:255'],
        ];
    }
}
