<?php

namespace App\Http\Resources\v1;

use App\Models\Vacancy;
use Illuminate\Http\Request;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin Vacancy */
class VacancyResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'title'            => $this->title,
            'slug'             => $this->slug,
            'job_type'         => $this->job_type,
            'location'         => $this->location,
            'closing_date'     => $this->closing_date?->format('Y-m-d'),
            'excerpt'          => $this->excerpt,
            'content'          => $this->content,
            'job_applications' => JobApplicationResource::collection($this->whenLoaded('jobApplications')),
        ];
    }
}
