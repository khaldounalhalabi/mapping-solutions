<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use App\Models\TrainingCategory;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin TrainingCategory */
class TrainingCategoryResource extends BaseResource
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
            'name'             => $this->name,
            'sort_order'       => $this->sort_order,
            'summary'          => $this->summary,
            'training_courses' => TrainingCourseResource::collection($this->whenLoaded('trainingCourses')),
        ];
    }
}
