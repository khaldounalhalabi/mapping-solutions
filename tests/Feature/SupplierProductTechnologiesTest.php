<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\ProductTechnology;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

class SupplierProductTechnologiesTest extends TestCase
{
    use LazilyRefreshDatabase;

    public function test_returns_distinct_technologies_for_each_supplier(): void
    {
        $supplier = Supplier::factory()->create();
        $otherSupplier = Supplier::factory()->create();
        $sharedTechnology = ProductTechnology::factory()->create();
        $otherTechnology = ProductTechnology::factory()->create();

        Product::factory()->count(2)->create(['supplier_id' => $supplier->id, 'product_technology_id' => $sharedTechnology->id]);
        Product::factory()->create(['supplier_id' => $supplier->id, 'product_technology_id' => null]);
        Product::factory()->create(['supplier_id' => $otherSupplier->id, 'product_technology_id' => $sharedTechnology->id]);
        Product::factory()->create(['supplier_id' => $otherSupplier->id, 'product_technology_id' => $otherTechnology->id]);

        $suppliers = Supplier::with('productTechnologies')->whereKey([$supplier->id, $otherSupplier->id])->get()->keyBy('id');

        $this->assertSame([$sharedTechnology->id], $supplier->productTechnologies()->pluck('product_technologies.id')->all());
        $this->assertSame([$sharedTechnology->id], $suppliers[$supplier->id]->productTechnologies->modelKeys());
        $this->assertEqualsCanonicalizing([$sharedTechnology->id, $otherTechnology->id], $suppliers[$otherSupplier->id]->productTechnologies->modelKeys());
    }
}
