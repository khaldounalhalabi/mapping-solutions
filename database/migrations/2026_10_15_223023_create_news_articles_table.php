<?php

use App\Models\NewsCategory;
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
        Schema::dropIfExists('news_articles');
    }

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('news_articles', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(NewsCategory::class)->constrained()->cascadeOnDelete();
            $table->json('title');
            $table->string('slug')->unique();
            $table->json('excerpt');
            $table->json('content');
            $table->json('hero_image')->nullable();
            $table->timestamps();
        });
    }
};
