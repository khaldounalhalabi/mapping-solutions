<?php

namespace Database\Factories;

use Exception;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\ProductFamily;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Supplier>
 */
class SupplierFactory extends Factory
{
    /**
     * @throws Exception
     */
    public function definition(): array
    {
        return [
            'name'        => fake()->company(),
            'description' => Translatable::fake('text')->toJson(),
            'logo'        => fakeImage(),
        ];
    }

    public function withProductFamilies(int $count = 1): static
    {
        return $this->has(ProductFamily::factory($count));
    }

    public function withProducts(int $count = 1): static
    {
        return $this->has(Product::factory($count));
    }
}
