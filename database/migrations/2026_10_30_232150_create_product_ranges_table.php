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
        Schema::dropIfExists('product_ranges');
    }

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_ranges', function (Blueprint $table) {
            $table->id();
            $table->text('label');
            $table->string('range');
            $table->string('colour');
            $table->string('title');
            $table->integer('sort_order');
            $table->text('description');
            $table->text('uses');
            $table->timestamps();
        });
    }
};
