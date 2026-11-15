<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->json('label');
            $table->json('description')->nullable();
            $table->string('key')->unique();
            $table->text('value');
            $table->json('structure');
            $table->boolean('is_public')->default(true);
            $table->timestamps();
        });
    }
};
