<?php

use App\Models\Supplier;
use App\Models\ProductFamily;
use App\Models\ProductTechnology;
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
        Schema::dropIfExists('products');
    }

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Supplier::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(ProductFamily::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(ProductTechnology::class)->nullable()->constrained()->cascadeOnDelete();
            $table->json('name');
            $table->string('price_note')->nullable();
            $table->string('slug')->unique();
            $table->json('excerpt')->nullable();
            $table->json('overview')->nullable();
            $table->json('key_specs')->nullable();
            $table->json('specifications')->nullable();
            $table->json('applications')->nullable();
            $table->text('external_url')->nullable();
            $table->json('hero_image')->nullable();
            $table->json('specifications_file')->nullable();
            $table->json('datasheet')->nullable();
            $table->json('manual')->nullable();
            $table->json('brochure')->nullable();
            $table->timestamps();
        });
    }
};
