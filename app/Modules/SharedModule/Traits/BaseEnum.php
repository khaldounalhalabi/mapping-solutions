<?php

namespace App\Modules\SharedModule\Traits;

use BackedEnum;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\In;

/**
 * @mixin BackedEnum
 */
trait BaseEnum
{
    /**
     * @param  array<static>|string[]|static|string $except
     * @return mixed|null
     */
    public static function fake(array|string|BackedEnum $except = []): mixed
    {
        return fake()
            ->randomElement(self::values($except));
    }

    /**
     * @param int|string|int[]|string[]|static|static[] $enums
     */
    public static function toValues(array|int|string|BackedEnum $enums): array
    {
        return array_map(
            fn ($item) => is_string($item) ? $item : $item->value,
            Arr::wrap($enums),
        );
    }

    public static function validation(): In
    {
        return Rule::in(self::values());
    }

    /**
     * @param static[]|string[]|static|string $except
     */
    public static function values(array|string|BackedEnum $except = []): array
    {
        $except = self::toValues($except);

        return array_filter(
            array_column(self::cases(), 'value'),
            fn ($item) => ! in_array($item, $except),
        );
    }
}
