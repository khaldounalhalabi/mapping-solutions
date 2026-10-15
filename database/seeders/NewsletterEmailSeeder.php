<?php

namespace Database\Seeders;

use App\Models\NewsletterEmail;
use Illuminate\Database\Seeder;

class NewsletterEmailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        NewsletterEmail::factory(10)->create();
    }
}
