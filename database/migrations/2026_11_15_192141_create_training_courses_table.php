<?php

use App\Models\TrainingCategory;
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
        Schema::dropIfExists('training_courses');
    }

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('training_courses', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(TrainingCategory::class)->constrained()->cascadeOnDelete();
            $table->json('name');
            $table->json('outline');
            $table->json('duration');
            $table->json('level');
            $table->boolean('is_published')->default(false);
            $table->integer('sort_order')->default(0);
            $table->json('summary');
            $table->timestamps();
        });
    }
};
