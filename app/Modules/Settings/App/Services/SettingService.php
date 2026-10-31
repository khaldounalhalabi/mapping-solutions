<?php

namespace App\Modules\Settings\App\Services;

use App\Serializers\Translatable;
use Illuminate\Support\Collection;
use App\Modules\SharedModule\Traits\Make;
use App\Modules\Settings\App\Models\Setting;

/**
 * @phpstan-consistent-constructor
 */
class SettingService
{
    use Make;

    public const string COLLECTION_CACHE_KEY = 'settings_collection';

    public const string PUBLIC_COLLECTION_CACHE_KEY = self::COLLECTION_CACHE_KEY.'_public';

    /**
     * @return Collection<int, Setting>
     */
    public function all(): Collection
    {
        return cache()
            ->rememberForever(
                self::COLLECTION_CACHE_KEY,
                fn () => Setting::all()
            );
    }

    public function find(int|string $id): ?Setting
    {
        return $this->all()->firstWhere('id', $id);
    }

    public function getByKey(string $key): ?Setting
    {
        return $this->all()->firstWhere('key', $key);
    }

    public function index(): ?array
    {
        return $this->paginate(
            Setting::query(),
        );
    }

    public function init(): void
    {
        $this->limit = request('limit', 10);
    }

    /**
     * @return Collection<int, Setting>
     */
    public function public(): Collection
    {
        return collect(cache()
            ->rememberForever(self::PUBLIC_COLLECTION_CACHE_KEY, function () {
                return Setting::isPublic()->get()->toArray();
            }));
    }

    public function update(int|string $id, mixed $value): ?Setting
    {
        $setting = $this->find($id);
        if (! $setting) {
            return null;
        }

        $setting->value = $value;
        $setting->save();
        cache()->forget(self::COLLECTION_CACHE_KEY);
        cache()->forget(self::PUBLIC_COLLECTION_CACHE_KEY);

        return $setting;
    }

    public function valueOf(string $key): float|bool|string|Translatable|null|array
    {
        return $this->getByKey($key)?->value ?? null;
    }
}
