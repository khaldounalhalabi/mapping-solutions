<?php

namespace Database\Factories;

use App\Models\Service;
use App\Models\ServiceCategory;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ServiceCategory>
 */
class ServiceCategoryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'     => Translatable::fake('word')->toJson(),
            'title'    => Translatable::fake('sentence')->toJson(),
            'excerpt'  => Translatable::fake('text')->toJson(),
            'icon_key' => 'layers-3',
        ];
    }

    public function withServices(int $count = 1): static
    {
        return $this->has(Service::factory($count));
    }
}
