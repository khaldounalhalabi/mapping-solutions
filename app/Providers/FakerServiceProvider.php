<?php

namespace App\Providers;

use Faker\Generator;
use App\Fakers\HTMLProvider;
use Illuminate\Support\ServiceProvider;

class FakerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        fake()->addProvider(
            new HTMLProvider(fake())
        );
    }

    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->afterResolving(
            Generator::class,
            function (Generator $faker) {
                $faker->addProvider(new HTMLProvider($faker));
            }
        );
    }
}
