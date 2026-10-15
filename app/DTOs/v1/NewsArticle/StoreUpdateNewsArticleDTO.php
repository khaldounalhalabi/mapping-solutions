<?php

namespace App\DTOs\v1\NewsArticle;

use Illuminate\Validation\Rule;
use Illuminate\Http\UploadedFile;
use App\Rules\MediaValidationRule;
use App\Rules\ValidTranslatableJson;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;
use WendellAdriel\ValidatedDTO\Casting\IntegerCast;

class StoreUpdateNewsArticleDTO extends ValidatedDTO
{
    public string $content;

    public string $excerpt;

    public ?UploadedFile $hero_image = null;

    public int $news_category_id;

    public string $slug;

    public string $title;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'news_category_id' => new IntegerCast,
            'title'            => new StringCast,
            'excerpt'          => new StringCast,
            'content'          => new StringCast,
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
            'news_category_id' => ['numeric', 'required', Rule::exists('news_categories', 'id')],
            'title'            => ['json', new ValidTranslatableJson, 'required'],
            'excerpt'          => ['json', new ValidTranslatableJson, 'required'],
            'content'          => ['json', new ValidTranslatableJson, 'required'],
            'hero_image'       => ['nullable', new MediaValidationRule],
        ];
    }
}
