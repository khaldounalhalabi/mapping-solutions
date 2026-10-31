<?php

use App\Models\Vacancy;
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
        Schema::dropIfExists('job_applications');
    }

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Vacancy::class)->nullable()->constrained()->cascadeOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->string('referral_source')->nullable();
            $table->boolean('eligible_to_work_in_uk');
            $table->string('notice_period')->nullable();
            $table->boolean('gdpr_consent');
            $table->text('cover_letter');
            $table->text('relevant_experience')->nullable();
            $table->text('linkedin_url')->nullable();
            $table->unique(['email', 'vacancy_id']);
            $table->timestamps();
        });
    }
};
