<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MarketApplication;

class MarketApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MarketApplication::factory(10)->create();
    }
}
