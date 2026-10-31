<?php

namespace App\Modules\Settings\database\factories;

use App\Modules\Settings\App\Enums\SettingTypeEnum;
use App\Modules\Settings\App\Models\Setting;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Setting>
 */
class SettingFactory extends Factory
{
    protected $model = Setting::class;

    /**
     * Define the model's default state.
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'label' => Translatable::fake(),
            'key' => fake()->unique()->word,
            'value' => Translatable::fake(),
            'structure' => [
                'value_type' => SettingTypeEnum::TRANSLATABLE->value,
            ]
        ];
    }
}
