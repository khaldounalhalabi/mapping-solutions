<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use App\Models\TrainingCourse;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin TrainingCourse */
class TrainingCourseResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                   => $this->id,
            'training_category'    => TrainingCategoryResource::make($this->whenLoaded('trainingCategory')),
            'training_category_id' => $this->training_category_id,
            'name'                 => $this->name,
            'outline'              => $this->outline,
            'duration'             => $this->duration,
            'level'                => $this->level,
            'is_published'         => $this->is_published,
            'sort_order'           => $this->sort_order,
            'summary'              => $this->summary,
        ];
    }
}
