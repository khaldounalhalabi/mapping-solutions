<?php

namespace App\Traits;

/**
 * @phpstan-consistent-constructor
 */
trait Makable
{
    private static $instance;

    public function init(): void {}

    public static function make(): static
    {
        if (is_null(self::$instance)) {
            self::$instance = new static;
        } elseif (! (self::$instance instanceof static)) {
            self::$instance = new static;
        }
        self::$instance->init();

        return self::$instance;
    }
}
