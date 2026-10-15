<?php

namespace App\DTOs\v1\NewsletterEmail;

use Illuminate\Http\UploadedFile;
use App\Rules\MediaValidationRule;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;

class StoreNewsletterEmailDTO extends ValidatedDTO
{
    /**
     * @var UploadedFile[]|null
     */
    public ?array $attachments = null;

    public string $content;

    public string $title;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'title'   => new StringCast,
            'content' => new StringCast,
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
            'title'         => ['required', 'string', 'max:255', 'min:3'],
            'content'       => ['required', 'max:5000', 'min:0'],
            'attachments'   => ['nullable', 'array'],
            'attachments.*' => [new MediaValidationRule(['file', 'max:10000'])],
        ];
    }
}
