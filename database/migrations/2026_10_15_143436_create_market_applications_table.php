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
        Schema::dropIfExists('market_applications');
    }

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('market_applications', function (Blueprint $table) {
            $table->id();
            $table->json('name');
            $table->string('icon_key');
            $table->json('summary');
            $table->json('description');
            $table->boolean('is_featured')->default(false);
            $table->string('theme_color')->default('#0ea5e9');
            $table->timestamps();
        });
    }
};
