<?php

namespace Database\Factories;

use App\Models\MarketApplication;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MarketApplication>
 */
class MarketApplicationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'        => Translatable::fake('firstName')->toJson(),
            'icon_key'    => 'x-mark',
            'summary'     => Translatable::fake('text')->toJson(),
            'description' => Translatable::fake('text')->toJson(),
            'is_featured' => false,
        ];
    }

    public function featured(): static
    {
        return $this->state(fn (array $attributes): array => [
            'is_featured' => true,
        ]);
    }
}
