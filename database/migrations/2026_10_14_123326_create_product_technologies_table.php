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
        Schema::dropIfExists('product_technologies');
    }

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_technologies', function (Blueprint $table) {
            $table->id();
            $table->json('name');
            $table->string('slug')->unique();
            $table->string('icon_key')->nullable();
            $table->json('icon')->nullable();
            $table->timestamps();
        });
    }
};
