export type AvailableLocales = "en" | "ar" | "fr";

export type Translatable = Record<AvailableLocales, string>;

export function translate(
    val: string | undefined | null,
    returnObject?: false,
): string;

export function translate(
    val: string | undefined | null,
    returnObject: true,
): Translatable;

export function translate(
    val: string | undefined | null,
    returnObject = false,
): string | Translatable {
    const currentLocale = document.documentElement.lang || "en";
    let translations: Partial<Translatable> = {};
    try {
        const parsed: unknown = JSON.parse(val ?? "{}");
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            translations = parsed as Partial<Translatable>;
        } else if (typeof parsed === "string") {
            translations = { en: parsed };
        } else if (val) {
            translations = { en: val };
        }
    } catch {
        translations = { en: val ?? "" };
    }
    if (returnObject) {
        return { en: "", ar: "", fr: "", ...translations };
    }
    const selected = translations[currentLocale as AvailableLocales];
    return (
        (typeof selected === "string" && selected.trim()
            ? selected
            : translations.en) || ""
    );
}
