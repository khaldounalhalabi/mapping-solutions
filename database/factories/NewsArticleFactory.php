<?php

namespace Database\Factories;

use App\Models\NewsArticle;
use App\Models\NewsCategory;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<NewsArticle>
 */
class NewsArticleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'news_category_id' => NewsCategory::factory(),
            'title'            => Translatable::fake('sentence')->toJson(),
            'slug'             => fake()->unique()->word(),
            'excerpt'          => Translatable::fake('text')->toJson(),
            'content'          => Translatable::fake('html')->toJson(),
            'hero_image'       => fakeImage(),
        ];
    }
}
