<?php

namespace Database\Factories;

use App\Models\TrainingCourse;
use App\Models\TrainingCategory;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TrainingCategory>
 */
class TrainingCategoryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'       => Translatable::fake('sentence')->toJson(),
            'sort_order' => fake()->randomNumber(2),
            'summary'    => Translatable::fake('text')->toJson(),
        ];
    }

    public function withTrainingCourses(int $count = 1): static
    {
        return $this->has(TrainingCourse::factory($count));
    }
}
