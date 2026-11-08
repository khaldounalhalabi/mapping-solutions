<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidTranslatableJson implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($value === null || $value === '') {
            return;
        }

        $translations = is_string($value) ? json_decode($value, true) : $value;
        $availableLocales = config('cubeta-starter.available_locales');

        if (! is_array($translations) || array_diff(array_keys($translations), $availableLocales)) {
            $fail(trans('site.validation.translatable'));

            return;
        }

        foreach ($translations as $translation) {
            if (! is_string($translation)) {
                $fail(trans('site.validation.translatable'));

                return;
            }
        }
    }
}
