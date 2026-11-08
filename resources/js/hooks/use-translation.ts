import { usePage } from "@inertiajs/react";
import englishTranslations from "../locales/en.json";

type Replacements = Record<string, string | number>;
type Translations = Record<string, unknown>;
type TranslationModule = { default: Translations };
type TranslationKey<Value, Prefix extends string = ""> = Value extends string
    ? Prefix
    : Value extends Record<string, unknown>
      ? {
            [Key in keyof Value & string]: TranslationKey<
                Value[Key],
                Prefix extends "" ? Key : `${Prefix}.${Key}`
            >;
        }[keyof Value & string]
      : never;

export type LocalizationKey = TranslationKey<typeof englishTranslations>;

const localeModules = import.meta.glob<TranslationModule>("../locales/*.json", {
    eager: true,
});

function translationsFor(locale: string): Translations {
    return localeModules[`../locales/${locale}.json`]?.default ?? {};
}

function getTranslation(
    translations: Record<string, unknown>,
    key: string,
): unknown {
    return key.split(".").reduce<unknown>((value, segment) => {
        if (!value || typeof value !== "object") {
            return undefined;
        }

        return (value as Record<string, unknown>)[segment];
    }, translations);
}

export function translateKey(
    key: LocalizationKey,
    replacements: Replacements = {},
    locale = typeof document === "undefined"
        ? "en"
        : document.documentElement.lang,
): string {
    const translated =
        getTranslation(translationsFor(locale), key) ??
        getTranslation(englishTranslations, key);
    const value = typeof translated === "string" ? translated : key;
    return Object.entries(replacements).reduce(
        (result, [name, replacement]) =>
            result.replaceAll(`:${name}`, String(replacement)),
        value,
    );
}

export function useTranslation() {
    const { currentLocale } = usePage().props;
    return {
        t:      (key: LocalizationKey, replacements: Replacements = {}) =>
            translateKey(key, replacements, currentLocale),
        locale: currentLocale,
    };
}

export function formatDate(
    value: string,
    options: Intl.DateTimeFormatOptions = { dateStyle: "long" },
): string {
    const date = new Date(
        /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00` : value,
    );
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat(
        document.documentElement.lang || "en",
        options,
    ).format(date);
}
export function formatNumber(value: number): string {
    return new Intl.NumberFormat(document.documentElement.lang || "en").format(
        value,
    );
}
