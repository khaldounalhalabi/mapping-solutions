<?php

namespace App\DTOs\v1\Vacancy;

use App\Enums\VacancyTypeEnum;
use App\Rules\ValidTranslatableJson;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;

class StoreUpdateVacancyDTO extends ValidatedDTO
{
    public string $closing_date;

    public string $content;

    public string $excerpt;

    public string $job_type;

    public ?string $location = null;

    public string $title;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'title'    => new StringCast,
            'slug'     => new StringCast,
            'excerpt'  => new StringCast,
            'job_type' => new StringCast,
            'location' => new StringCast,
            'content'  => new StringCast,
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
            'title'        => ['json', new ValidTranslatableJson, 'required'],
            'excerpt'      => ['json', new ValidTranslatableJson, 'required'],
            'job_type'     => ['required', 'string', VacancyTypeEnum::validation()],
            'location'     => ['nullable', 'string', 'max:255', 'min:3'],
            'closing_date' => ['required', 'date', 'date_format:Y-m-d'],
            'content'      => ['json', new ValidTranslatableJson, 'required'],
        ];
    }
}
