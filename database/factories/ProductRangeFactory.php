<?php

namespace Database\Factories;

use App\Models\ProductRange;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProductRange>
 */
class ProductRangeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'label'       => fake()->word(),
            'range'       => fake()->word(),
            'colour'      => fake()->word(),
            'title'       => fake()->word(),
            'sort_order'  => fake()->randomNumber(2),
            'description' => fake()->text(),
            'uses'        => fake()->text(),
        ];
    }
}
