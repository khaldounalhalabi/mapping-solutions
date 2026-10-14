<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductTechnology;

class ProductTechnologySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductTechnology::factory(10)->create();
    }
}
