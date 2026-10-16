<?php

namespace Database\Factories;

use App\Models\Vacancy;
use App\Enums\VacancyTypeEnum;
use App\Models\JobApplication;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Vacancy>
 */
class VacancyFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title'        => Translatable::fake('jobTitle')->toJson(),
            'slug'         => fake()->unique()->word(),
            'excerpt'      => Translatable::fake('text')->toJson(),
            'job_type'     => VacancyTypeEnum::fake(),
            'location'     => fake()->address(),
            'closing_date' => fake()->date(),
            'content'      => Translatable::fake('html')->toJson(),
        ];
    }

    public function withJobApplications(int $count = 1): static
    {
        return $this->has(JobApplication::factory($count));
    }
}
