<?php

namespace App\Modules\Settings\App\Models;

use Exception;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use App\Serializers\Translatable;
use App\Rules\MediaValidationRule;
use App\Rules\ValidTranslatableJson;
use App\Serializers\SerializedMedia;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use App\Casts\Translatable as TranslatableCast;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Modules\Settings\App\Enums\SettingTypeEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Modules\Settings\App\Services\SettingService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Modules\Settings\database\factories\SettingFactory;

/**
 * @property int                      $id
 * @property string                   $key
 * @property Translatable             $label
 * @property Translatable             $description
 * @property mixed                    $value
 * @property array{value_type:string} $structure
 * @property bool                     $is_public
 *
 * @method Builder<Setting> isPublic()
 *
 * @mixin Builder<Setting>
 *
 * @use HasFactory<SettingFactory>
 */
class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'key',
        'value',
        'structure',
        'description',
        'is_public',
    ];

    protected static function booted(): void
    {
        $forgetCache = function () {
            cache()->forget(SettingService::COLLECTION_CACHE_KEY);
            cache()->forget(SettingService::PUBLIC_COLLECTION_CACHE_KEY);
        };
        self::created($forgetCache);
        self::updated($forgetCache);
        self::deleted($forgetCache);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'label'       => TranslatableCast::class,
            'description' => TranslatableCast::class,
            'structure'   => 'array',
        ];
    }

    protected static function newFactory(): Factory|SettingFactory
    {
        return SettingFactory::new();
    }

    protected function value(): Attribute
    {
        return Attribute::make(
            get: fn ($value, array $attributes) => $this->getValueBasedOnStructure($value),
            set: fn ($value) => $this->setValueBasedOnStructure($value),
        );
    }

    public function getValidationRulesBasedOnType(): array|string
    {
        return match ($this->getValueType()) {
            SettingTypeEnum::BOOLEAN  => 'boolean|required',
            SettingTypeEnum::DATE     => 'date|date_format:Y-m-d|required',
            SettingTypeEnum::DATETIME => 'date|date_format:Y-m-d H:i|required',
            SettingTypeEnum::TIME     => 'date_format:H:i|required',
            SettingTypeEnum::TRANSLATABLE,
            SettingTypeEnum::TRANSLATABLE_TEXT,
            SettingTypeEnum::TRANSLATABLE_HTML_TEXT           => [new ValidTranslatableJson, 'json', 'required'],
            SettingTypeEnum::NUMERIC                          => 'numeric|required',
            SettingTypeEnum::HTML_TEXT, SettingTypeEnum::TEXT => 'required|string',
            SettingTypeEnum::SELECT                           => [Rule::in($this->structure['options'] ?? []), 'string'],
            SettingTypeEnum::FILE                             => [
                'required',
                new MediaValidationRule(['file', 'max:10000']),
            ],
            SettingTypeEnum::PHONE => ['required', 'string', 'max:191', 'phone:INTERNATIONAL'],
            SettingTypeEnum::URL   => ['required', 'string', 'active_url'],
            default                => 'string|required|max:500',
        };
    }

    /**
     * @throws Exception
     */
    public function getValueBasedOnStructure($value): float|bool|string|Translatable|array|SerializedMedia
    {
        // when using Setting::create method, the order of the fillable key in the array is critical
        // since the structure must be assigned first due to the need to determine the value type
        return match ($this->getValueType()) {
            SettingTypeEnum::BOOLEAN  => ! ($value == 'false') && $value,
            SettingTypeEnum::DATE     => Carbon::parse($value)->format('Y-m-d'),
            SettingTypeEnum::DATETIME => Carbon::parse($value)->format('Y-m-d H:i:s'),
            SettingTypeEnum::TIME     => Carbon::parse($value)->format('H:i:s'),
            SettingTypeEnum::TRANSLATABLE,
            SettingTypeEnum::TRANSLATABLE_TEXT,
            SettingTypeEnum::TRANSLATABLE_HTML_TEXT => new Translatable($value),
            SettingTypeEnum::NUMERIC                => floatval($value),
            SettingTypeEnum::RESOURCE               => $this->structure['is_multiple'] ? json_decode($value, true) : $value,
            SettingTypeEnum::FILE                   => new SerializedMedia(json_decode($value, true), $this->getTable()),
            default                                 => $value,
        };
    }

    public function getValueType(): SettingTypeEnum
    {
        return isset($this->structure['value_type'])
            ? (SettingTypeEnum::tryFrom($this->structure['value_type']) ?? SettingTypeEnum::STRING)
            : SettingTypeEnum::STRING;
    }

    public function scopeIsPublic(Builder $builder): Builder
    {
        return $builder->where('is_public', true);
    }

    public static function searchableArray(): array
    {
        return [
            'label',
            'key',
            'value',
            'structure',
        ];
    }

    /**
     * @throws Exception
     */
    public function setValueBasedOnStructure(mixed $value)
    {
        return match ($this->getValueType()) {
            SettingTypeEnum::BOOLEAN  => (! ($value == 'false') && $value) ? 1 : 0,
            SettingTypeEnum::DATE     => Carbon::parse($value)->format('Y-m-d'),
            SettingTypeEnum::DATETIME => Carbon::parse($value)->format('Y-m-d H:i:s'),
            SettingTypeEnum::TIME     => Carbon::parse($value)->format('H:i:s'),
            SettingTypeEnum::TRANSLATABLE,
            SettingTypeEnum::TRANSLATABLE_TEXT,
            SettingTypeEnum::TRANSLATABLE_HTML_TEXT => (new Translatable($value))->toJson(),
            SettingTypeEnum::NUMERIC                => floatval($value),
            SettingTypeEnum::RESOURCE               => $this->structure['is_multiple']
                ? Str::isJson($value) ? $value : json_encode($value)
                : $value,
            SettingTypeEnum::FILE => new SerializedMedia($value, $this->getTable()),
            default               => $value,
        };
    }
}
