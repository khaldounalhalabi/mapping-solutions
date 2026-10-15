<?php

namespace Database\Seeders;

use App\Models\NewsletterEmail;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class NewsletterEmailSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        NewsletterEmail::factory(10)->create();
    }
}
