<?php

namespace Database\Factories;

use App\Models\NewsCategory;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<NewsCategory>
 */
class NewsCategoryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => Translatable::fake('sentence')->toJson(),
        ];
    }
}
