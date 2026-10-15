<?php

namespace App\Http\Resources\BaseResource;

use Illuminate\Http\Resources\Json\JsonResource;

class BaseResource extends JsonResource
{
    protected mixed $data;

    protected bool $detailed = false;

    public array $additions = [];

    protected static function newCollection($resource): AnonymousResourceCollection
    {
        return new AnonymousResourceCollection($resource, static::class);
    }

    /**
     * @return AnonymousResourceCollection
     */
    public static function collection($resource)
    {
        return parent::collection($resource);
    }

    public function detailed(): static
    {
        $this->detailed = true;

        return $this;
    }

    public function extra(array $extraData = []): static
    {
        $this->additions = [...$this->additions, ...$extraData];

        return $this;
    }

    public function jsonSerialize(): array
    {
        return array_merge(parent::jsonSerialize(), $this->additions);
    }
}
