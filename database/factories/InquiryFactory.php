<?php

namespace Database\Factories;

use App\Models\Inquiry;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Inquiry>
 */
class InquiryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'first_name' => fake()->firstName(),
            'last_name'  => fake()->lastName(),
            'company'    => fake()->company(),
            'country'    => fake()->country(),
            'email'      => fake()->email(),
            'phone'      => fake()->phoneNumber(),
            'subject'    => fake()->sentence(),
            'message'    => fake()->text(),
        ];
    }
}
