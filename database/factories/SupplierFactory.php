<?php

namespace Database\Factories;

use Exception;
use App\Models\Supplier;
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
            'name' => fake()->company(),
            'description' => Translatable::fake('text')->toJson(),
            'logo' => fakeImage(),
        ];
    }
}
