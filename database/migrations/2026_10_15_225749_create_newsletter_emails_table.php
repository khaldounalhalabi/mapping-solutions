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
        Schema::dropIfExists('newsletter_emails');
    }

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('newsletter_emails', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->json('attachments')->nullable();
            $table->timestamps();
        });
    }
};
