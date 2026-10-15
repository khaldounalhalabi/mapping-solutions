<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductTechnology;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProductTechnology>
 */
class ProductTechnologyFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => Translatable::fake()->toJson(),
            'icon_key' => fake()->word(),
            'icon' => fakeImage(),
        ];
    }

    public function withProducts(int $count = 1): static
    {
        return $this->has(Product::factory($count));
    }
}
