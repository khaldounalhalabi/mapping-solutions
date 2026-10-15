<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Supplier;
use App\Models\ProductFamily;
use App\Models\ProductTechnology;
use App\Serializers\Translatable;
use Illuminate\Http\UploadedFile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'supplier_id' => Supplier::factory(),
            'product_family_id' => ProductFamily::factory(),
            'product_technology_id' => ProductTechnology::factory(),
            'name' => Translatable::fake('sentence')->toJson(),
            'price_note' => fake()->word(),
            'excerpt' => Translatable::fake('text'),
            'overview' => Translatable::fake('html'),
            'key_specs' => Translatable::fake('html'),
            'specifications' => Translatable::fake('html'),
            'applications' => Translatable::fake('html'),
            'external_url' => fake()->url(),
            'hero_image' => fakeImage(),
            'specifications_file' => UploadedFile::fake()->create('specifications.pdf', 1024, 'application/pdf'),
            'datasheet' => UploadedFile::fake()->create('datasheet.pdf', 1024, 'application/pdf'),
            'manual' => UploadedFile::fake()->create('manual.pdf', 1024, 'application/pdf'),
            'brochure' => UploadedFile::fake()->create('brochure.pdf', 1024, 'application/pdf'),
        ];
    }
}
