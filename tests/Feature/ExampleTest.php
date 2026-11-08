<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

class ExampleTest extends TestCase
{
    use LazilyRefreshDatabase;

    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
