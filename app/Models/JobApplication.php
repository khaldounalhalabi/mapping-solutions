<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Database\Factories\JobApplicationFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property int         $id
 * @property int         $vacancy_id
 * @property string      $first_name
 * @property string      $last_name
 * @property string      $email
 * @property string      $phone
 * @property string|null $referral_source
 * @property bool        $eligible_to_work_in_uk
 *
 * @method Builder eligibleToWorkInUk()
 *
 * @property string|null $notice_period
 * @property bool        $gdpr_consent
 *
 * @method Builder gdprConsent()
 *
 * @property string       $cover_letter
 * @property string|null  $relevant_experience
 * @property string|null  $linkedin_url
 * @property Vacancy|null $vacancy
 * @property Carbon       $created_at
 * @property Carbon       $updated_at
 *
 * @mixin Builder<JobApplication>
 *
 * @use  HasFactory<JobApplicationFactory>
 */
#[Fillable([
    'vacancy_id',
    'first_name',
    'last_name',
    'email',
    'phone',
    'referral_source',
    'eligible_to_work_in_uk',
    'notice_period',
    'gdpr_consent',
    'cover_letter',
    'relevant_experience',
    'linkedin_url',
])]
class JobApplication extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'eligible_to_work_in_uk' => 'boolean',
            'gdpr_consent'           => 'boolean',
        ];
    }

    public function exportable(): array
    {
        return [
            'first_name',
            'last_name',
            'email',
            'phone',
            'referral_source',
            'eligible_to_work_in_uk',
            'notice_period',
            'gdpr_consent',
            'cover_letter',
            'relevant_experience',
            'linkedin_url',
            'vacancy.title',
        ];
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'vacancy' => ['title', 'slug', 'excerpt', 'job_type', 'location', 'content'],

        ];
    }

    public function scopeEligibleToWorkInUk(Builder $query): Builder
    {
        return $query->where('eligible_to_work_in_uk', true);
    }

    public function scopeGdprConsent(Builder $query): Builder
    {
        return $query->where('gdpr_consent', true);
    }

    public static function searchableArray(): array
    {
        return [
            'first_name',
            'last_name',
            'email',
            'phone',
            'referral_source',
            'notice_period',
            'cover_letter',
            'relevant_experience',
            'linkedin_url',
        ];
    }

    /**
     * @return BelongsTo<Vacancy, static>
     */
    public function vacancy(): BelongsTo
    {
        return $this->belongsTo(Vacancy::class);
    }
}
