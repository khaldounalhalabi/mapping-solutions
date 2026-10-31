<?php

namespace App\DTOs\v1\JobApplication;

use Illuminate\Validation\Rule;
use WendellAdriel\ValidatedDTO\ValidatedDTO;
use WendellAdriel\ValidatedDTO\Casting\StringCast;
use WendellAdriel\ValidatedDTO\Casting\BooleanCast;
use WendellAdriel\ValidatedDTO\Casting\IntegerCast;

class StoreJobApplicationDTO extends ValidatedDTO
{
    public string $cover_letter;

    public bool $eligible_to_work_in_uk;

    public string $email;

    public string $first_name;

    public bool $gdpr_consent;

    public string $last_name;

    public ?string $linkedin_url = null;

    public ?string $notice_period = null;

    public string $phone;

    public ?string $referral_source = null;

    public ?string $relevant_experience = null;

    public ?int $vacancy_id = null;

    /**
     * Get the type casting for the DTO properties.
     */
    protected function casts(): array
    {
        return [
            'vacancy_id'             => new IntegerCast,
            'first_name'             => new StringCast,
            'last_name'              => new StringCast,
            'email'                  => new StringCast,
            'phone'                  => new StringCast,
            'referral_source'        => new StringCast,
            'eligible_to_work_in_uk' => new BooleanCast,
            'notice_period'          => new StringCast,
            'gdpr_consent'           => new BooleanCast,
            'cover_letter'           => new StringCast,
            'relevant_experience'    => new StringCast,
            'linkedin_url'           => new StringCast,
        ];
    }

    /**
     * Get the default values for the DTO properties.
     */
    protected function defaults(): array
    {
        return [

        ];
    }

    /**
     * Get the validation rules that apply to the DTO.
     */
    protected function rules(): array
    {
        return [
            'vacancy_id' => ['nullable', 'integer', Rule::exists('vacancies', 'id')->where(fn ($query) => $query->whereDate('closing_date', '>=', today()))],
            'first_name' => ['required', 'string', 'max:255', 'min:1'],
            'last_name'  => ['required', 'string', 'max:255', 'min:1'],
            'email'      => [
                'required',
                'string',
                'max:255',
                'email',
                'min:6',
                Rule::unique('job_applications', 'email')
                    ->where('vacancy_id', data_get($this->dtoData, 'vacancy_id')),
            ],
            'phone'                  => ['required', 'string', 'max:255', 'phone:INTERNATIONAL'],
            'referral_source'        => ['nullable', 'string', Rule::in(['Website', 'LinkedIn', 'Job Board', 'Referral', 'Other'])],
            'eligible_to_work_in_uk' => ['required', 'boolean'],
            'notice_period'          => ['nullable', 'string', Rule::in(['Immediate', '1 Month', '2 Months', '3 Months', 'Other'])],
            'gdpr_consent'           => ['required', 'accepted'],
            'cover_letter'           => ['required', 'string', 'max:5000'],
            'relevant_experience'    => ['nullable', 'string', 'max:5000'],
            'linkedin_url'           => ['nullable', 'string', 'max:2048', 'url:http,https', 'regex:~^https?://([a-z]{2,3}\.)?(www\.)?linkedin\.com/[^\s]*$~i'],
        ];
    }
}
