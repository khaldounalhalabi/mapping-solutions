<?php

namespace Database\Factories;

use App\Models\Service;
use App\Models\ServiceCategory;
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
            'service_category_id' => ServiceCategory::factory(),
            'name'                => Translatable::fake('sentence')->toJson(),
            'summary'             => Translatable::fake('text')->toJson(),
        ];
    }
}
