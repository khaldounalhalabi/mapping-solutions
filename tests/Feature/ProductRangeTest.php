<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\ProductRange;
use Database\Seeders\ProductRangeSeeder;
use Inertia\Testing\AssertableInertia as Assert;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductRangeTest extends TestCase
{
    use RefreshDatabase;

    public function test_about_displays_seeded_ranges_in_order(): void
    {
        $this->seed(ProductRangeSeeder::class);
        $this->seed(ProductRangeSeeder::class);

        $this->assertDatabaseCount('product_ranges', 5);
        $this->get(route('site.about'))->assertOk()->assertInertia(fn (Assert $page) => $page
            ->component('site/about/index')
            ->has('ranges', 5)
            ->where('ranges.0.label', 'VNIR')
            ->where('ranges.1.label', 'SWIR'));
    }

    public function test_authenticated_user_can_create_update_and_delete_a_range(): void
    {
        $user = User::factory()->create();
        $data = ['label' => 'VNIR', 'range' => '400–1000 nm', 'colour' => '#1a9ed4', 'title' => 'Visible infrared', 'description' => 'A description.', 'uses' => "First use\nSecond use", 'sort_order' => 0];
        $this->actingAs($user)->post(route('v1.web.protected.product.ranges.store'), $data)->assertRedirect();
        $range = ProductRange::firstOrFail();
        $data['title'] = 'Updated title';
        $this->actingAs($user)->put(route('v1.web.protected.product.ranges.update', $range->id), $data)->assertRedirect();
        $this->assertDatabaseHas('product_ranges', ['id' => $range->id, 'title' => 'Updated title']);
        $this->actingAs($user)->delete(route('v1.web.protected.product.ranges.destroy', $range->id))->assertOk();
        $this->assertDatabaseMissing('product_ranges', ['id' => $range->id]);
    }
}
