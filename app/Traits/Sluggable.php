<?php

namespace App\Traits;

use Illuminate\Support\Str;
use InvalidArgumentException;
use App\Serializers\Translatable;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin Model
 *
 * @phpstan-require-extends Model
 */
trait Sluggable
{
    /**
     * @param array{
     *     col: string|callable,
     *     slug_col: string,
     *     unique_cond?: callable,
     *     separator?: string,
     *     depends_on?: list<string>
     * } $config
     */
    private static function checkForUniqueness(
        Model $item,
        array $config,
        string $slug,
    ): bool {
        if (isset($config['unique_cond'])) {
            return (bool) $config['unique_cond']($slug, $item);
        }

        return $item->newQuery()
            ->where($config['slug_col'], $slug)
            ->when(
                $item->exists,
                fn ($query) => $query->whereKeyNot($item->getKey()),
            )
            ->exists();
    }

    /**
     * @param array{
     *     col: string|callable,
     *     slug_col: string,
     *     unique_cond?: callable,
     *     separator?: string,
     *     depends_on?: list<string> } $config
     */
    private static function generateSlug(
        Model $item,
        array $config,
    ): void {
        assert($item instanceof static);
        $separator = $config['separator'] ?? '-';

        if (empty(trim($separator)) || empty($separator)) {
            throw new InvalidArgumentException(
                "Separator can't be empty or underscore",
            );
        }

        $source = $config['col'];

        $property = is_callable($source)
            ? $source($item)
            : data_get($item, $source);

        if ($property instanceof Translatable) {
            $property = $property->forceTranslate('en');
        }

        if (! is_string($property) && ! is_numeric($property)) {
            throw new InvalidArgumentException(
                'Sluggable property must be a string or number',
            );
        }

        $slug = Str::slug((string) $property, $separator);

        if (empty($slug)) {
            throw new InvalidArgumentException(
                'Generated slug must not be empty',
            );
        }

        $newSlug = $slug;
        $loopIndex = 1;

        while (self::checkForUniqueness($item, $config, $newSlug)) {
            $newSlug = "{$slug}{$separator}{$loopIndex}";
            $loopIndex++;
        }

        $item->{$config['slug_col']} = $newSlug;
    }

    protected static function bootSluggable(): void
    {
        static::creating(
            function (Model $item) {
                assert($item instanceof static);
                foreach ($item->sluggable() as $config) {
                    self::generateSlug($item, $config);
                }
            },
        );

        static::updating(
            /**
             * @param static&Model $item
             */
            function (Model $item) {
                assert($item instanceof static);
                foreach ($item->sluggable() as $config) {
                    $source = $config['col'];

                    $dependencies = $config['depends_on']
                        ?? (is_string($source) ? [$source] : null);

                    // Callable sources without dependencies
                    // are regenerated on every update.
                    if ($dependencies === null) {
                        self::generateSlug($item, $config);

                        continue;
                    }

                    if ($item->isDirty($dependencies)) {
                        self::generateSlug($item, $config);
                    }
                }
            },
        );
    }

    /**
     * @return list<array{
     *     col: string|callable,
     *     slug_col: string,
     *     unique_cond?: callable,
     *     separator?: string,
     *     depends_on?: list<string>
     * }>
     */
    public function sluggable(): array
    {
        return [];
    }
}
