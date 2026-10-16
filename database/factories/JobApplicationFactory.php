<?php

namespace Database\Factories;

use App\Models\Vacancy;
use App\Models\JobApplication;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JobApplication>
 */
class JobApplicationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'vacancy_id'             => Vacancy::factory(),
            'first_name'             => fake()->firstName(),
            'last_name'              => fake()->lastName(),
            'email'                  => fake()->email(),
            'phone'                  => fake()->phoneNumber(),
            'referral_source'        => fake()->word(),
            'eligible_to_work_in_uk' => fake()->boolean(),
            'notice_period'          => fake()->word(),
            'gdpr_consent'           => fake()->boolean(),
            'cover_letter'           => fake()->text(),
            'relevant_experience'    => fake()->text(),
            'linkedin_url'           => fake()->url(),
        ];
    }
}
