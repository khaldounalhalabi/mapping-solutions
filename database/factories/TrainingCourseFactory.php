<?php

namespace Database\Factories;

use App\Models\TrainingCourse;
use App\Models\TrainingCategory;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TrainingCourse>
 */
class TrainingCourseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'training_category_id' => TrainingCategory::factory(),
            'name'                 => Translatable::fake('sentence')->toJson(),
            'outline'              => Translatable::fake('text')->toJson(),
            'duration'             => Translatable::fake('sentence')->toJson(),
            'level'                => Translatable::fake('sentence')->toJson(),
            'is_published'         => fake()->boolean(),
            'sort_order'           => fake()->randomNumber(2),
            'summary'              => Translatable::fake('text')->toJson(),
        ];
    }
}
