<?php

namespace App\Http\Resources\v1;

use App\Models\NewsArticle;
use Illuminate\Http\Request;
use App\Http\Resources\BaseResource\BaseResource;

/** @mixin NewsArticle */
class NewsArticleResource extends BaseResource
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
            'news_category'    => NewsCategoryResource::make($this->whenLoaded('newsCategory')),
            'news_category_id' => $this->news_category_id,
            'title'            => $this->title,
            'slug'             => $this->slug,
            'excerpt'          => $this->excerpt,
            'content'          => $this->content,
            'hero_image'       => $this->hero_image,
        ];
    }
}
