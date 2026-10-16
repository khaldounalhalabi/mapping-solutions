<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use App\Models\JobApplication;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin JobApplication */
class JobApplicationResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                     => $this->id,
            'vacancy'                => VacancyResource::make($this->whenLoaded('vacancy')),
            'vacancy_id'             => $this->vacancy_id,
            'first_name'             => $this->first_name,
            'last_name'              => $this->last_name,
            'email'                  => $this->email,
            'phone'                  => $this->phone,
            'referral_source'        => $this->referral_source,
            'eligible_to_work_in_uk' => $this->eligible_to_work_in_uk,
            'notice_period'          => $this->notice_period,
            'gdpr_consent'           => $this->gdpr_consent,
            'cover_letter'           => $this->cover_letter,
            'relevant_experience'    => $this->relevant_experience,
            'linkedin_url'           => $this->linkedin_url,
        ];
    }
}
