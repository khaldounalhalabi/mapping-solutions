<?php

namespace Database\Factories;

use App\Models\Service;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'group' => Translatable::fake()->toJson(),
            'name' => Translatable::fake('sentence')->toJson(),
            'summary' => Translatable::fake('text')->toJson(),
        ];
    }
}
