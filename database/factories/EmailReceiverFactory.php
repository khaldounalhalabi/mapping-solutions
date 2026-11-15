<?php

namespace Database\Factories;

use App\Models\EmailReceiver;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<EmailReceiver>
 */
class EmailReceiverFactory extends Factory
{
    public function definition(): array
    {
        return [
            'email' => fake()->unique()->email(),
        ];
    }
}
