<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'first_name' => 'Amer',
            'last_name' => 'Alrweishdy',
            'email' => 'amer.alrweishdy@mapping-solutions.co.uk',
            'password' => '123456789',
        ]);
    }
}
