<?php

namespace Database\Factories;

use App\Models\Supplier;
use App\Models\ProductFamily;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProductFamily>
 */
class ProductFamilyFactory extends Factory
{
    public function definition(): array
    {
        return [
            'supplier_id' => Supplier::factory(),
            'name' => Translatable::fake()->toJson(),
        ];
    }
}
