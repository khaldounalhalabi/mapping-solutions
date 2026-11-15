<?php

namespace App\DTOs\v1\TrainingCourse;

use Illuminate\Validation\Rule;
use App\Rules\ValidTranslatableJson;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;
use WendellAdriel\ValidatedDTO\Casting\BooleanCast;
use WendellAdriel\ValidatedDTO\Casting\IntegerCast;

class StoreUpdateTrainingCourseDTO extends ValidatedDTO
{
    public string $duration;

    public bool $is_published;

    public string $level;

    public string $name;

    public string $outline;

    public int $sort_order;

    public string $summary;

    public int $training_category_id;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'training_category_id' => new IntegerCast,
            'name'                 => new StringCast,
            'outline'              => new StringCast,
            'duration'             => new StringCast,
            'level'                => new StringCast,
            'is_published'         => new BooleanCast,
            'sort_order'           => new IntegerCast,
            'summary'              => new StringCast,
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
            'training_category_id' => ['integer', 'required', Rule::exists('training_categories', 'id')],
            'name'                 => ['json', new ValidTranslatableJson, 'required'],
            'outline'              => ['json', new ValidTranslatableJson, 'required'],
            'duration'             => ['json', new ValidTranslatableJson, 'required'],
            'level'                => ['json', new ValidTranslatableJson, 'required'],
            'is_published'         => ['required', 'boolean'],
            'sort_order'           => ['required', 'integer', 'min:0', 'max:2147483647'],
            'summary'              => ['json', new ValidTranslatableJson, 'required'],
        ];
    }
}
