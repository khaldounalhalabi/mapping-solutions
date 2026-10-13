<?php

namespace App\Traits;

use Exception;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin Model
 */
trait Sluggable
{
    /**
     * @param array{col:string , slug_col:string , unique_cols:array|null , unique_cond:callable|null} $sluggables
     */
    private static function checkForUniqueness(array $sluggables, string $slug): bool
    {
        if (! isset($sluggables['unique_cond'])) {
            return self::query()->where("{$sluggables['slug_col']}", $slug)->exists();
        }

        return (bool) $sluggables['unique_cond']($slug);
    }

    /**
     * @param static&Model $item
     *
     * @throws Exception
     */
    private static function generateSlug(Model $item): void
    {
        foreach ($item->sluggable() as $sluggables) {
            $separator = $sluggables['separator'] ?? '-';

            if (empty(trim($separator))) {
                throw new Exception("Separator can't be empty or underscore");
            }

            if (! is_callable($sluggables['col'])) {
                $property = data_get($item, $sluggables['col']);
                if ($property instanceof Translatable) {
                    $property = $property->forceTranslate('en');
                }

                if (empty($property)) {
                    throw new Exception('Sluggable property must not be null or an empty string');
                }

                $slug = str($property.'')
                    ->kebab()
                    ->singular()
                    ->lower()
                    ->replace('-', $separator)
                    ->replace('.', '-')
                    ->replace('_', '-')
                    ->replace('--', '-')
                    ->toString();
            } else {
                $slug = $sluggables['col']();
            }

            $notUnique = self::checkForUniqueness($sluggables, $slug);

            $loopIndex = 1;
            while ($notUnique) {
                $num = $loopIndex;
                $newSlug = "{$slug}{$separator}{$num}";
                $notUnique = self::checkForUniqueness($sluggables, $newSlug);
                $loopIndex++;
            }

            $item->{"{$sluggables['slug_col']}"} = $newSlug ?? $slug;
        }
    }

    protected static function bootSluggable(): void
    {
        self::creating(function (Model $item) {
            self::generateSlug($item);
        });

        self::updating(function (Model $item) {
            self::generateSlug($item);
        });
    }

    /**
     * @return array{array{col:string , slug_col:string , unique_cols:array|null , unique_cond:callable|null,
     *                                separator:string}}
     */
    public function sluggable(): array
    {
        return [];
    }
}
