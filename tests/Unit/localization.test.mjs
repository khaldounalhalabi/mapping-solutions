import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { translate } from "../../resources/js/models/translatable.ts";
import { siteRoute } from "../../resources/js/lib/site-route.ts";
import { languageSwitchUrl } from "../../resources/js/lib/language-switch-url.ts";

globalThis.document = { documentElement: { lang: "en" } };

test("switching language replaces the explicit language and preserves filters and fragments", () => {
    assert.equal(
        languageSwitchUrl(
            "https://example.com/products?lang=ar&page=2#details",
            "fr",
        ),
        "https://example.com/products?lang=fr&page=2#details",
    );
    assert.equal(
        languageSwitchUrl("https://example.com/products?page=2#details", "fr"),
        "https://example.com/products?page=2#details",
    );
});

function flatten(value, prefix = "") {
    return Object.fromEntries(
        Object.entries(value).flatMap(([key, entry]) =>
            typeof entry === "object"
                ? Object.entries(flatten(entry, `${prefix}${key}.`))
                : [[`${prefix}${key}`, entry]],
        ),
    );
}
const catalogue = (locale) =>
    flatten(
        JSON.parse(
            readFileSync(
                new URL(
                    `../../resources/js/locales/${locale}.json`,
                    import.meta.url,
                ),
            ),
        ),
    );
const placeholders = (value) =>
    [...value.matchAll(/:[a-z_]+|_[A-Z]+_/g)].map((match) => match[0]).sort();

for (const locale of ["ar", "fr"]) {
    test(`${locale} translations cover all keys and preserve placeholders`, () => {
        const english = catalogue("en");
        const translated = catalogue(locale);
        assert.deepEqual(
            Object.keys(translated).sort(),
            Object.keys(english).sort(),
        );
        for (const [key, value] of Object.entries(english)) {
            assert.ok(translated[key].trim(), `${locale}:${key} is empty`);
            assert.deepEqual(
                placeholders(translated[key]),
                placeholders(value),
                `${locale}:${key}`,
            );
        }
    });
}

test("content uses the active language and falls back to English for missing or blank translations", () => {
    document.documentElement.lang = "ar";
    assert.equal(translate('{"en":"English","ar":"العربية"}'), "العربية");
    assert.equal(translate('{"en":"English","ar":"  "}'), "English");
    assert.equal(translate('{"en":"English"}'), "English");
    assert.equal(translate(null), "");
});

test("editing legacy content preserves the English value and other translations", () => {
    assert.deepEqual(translate("Legacy content", true), {
        en: "Legacy content",
        ar: "",
        fr: "",
    });
    const value = translate(
        '{"en":"English","ar":"العربية","fr":"Français"}',
        true,
    );
    value.ar = "جديد";
    assert.equal(value.en, "English");
    assert.equal(value.fr, "Français");
    assert.equal(translate("123"), "123");
});

test("public links include the active language while preserving route parameters", () => {
    globalThis.route = (name, parameters) =>
        `https://example.com/products/${parameters}?source=catalogue`;
    for (const locale of ["en", "ar", "fr"]) {
        document.documentElement.lang = locale;
        assert.equal(
            siteRoute("site.products.show", "sensor-one"),
            `https://example.com/products/sensor-one?source=catalogue&lang=${locale}`,
        );
    }
});
