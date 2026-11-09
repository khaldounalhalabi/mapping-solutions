import assert from "node:assert/strict";
import { after, test } from "node:test";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import { createServer } from "vite";

const server = await createServer({
    configFile: false,
    resolve:    {
        alias: {
            "@": fileURLToPath(new URL("../../resources/js", import.meta.url)),
        },
    },
    server:     { middlewareMode: true, hmr: false, ws: false, watch: null },
    appType:    "custom",
});
after(() => server.close());
const { default: SeoHead } = await server.ssrLoadModule(
    "/resources/js/components/seo-head.tsx",
);

const publicSeo = {
    title:          'Sensor "A" | Mapping Solutions',
    description:    "Accurate measurements & expert support.",
    robots:         "index, follow, max-image-preview:large",
    canonical:      "https://example.com/products/sensor?lang=fr",
    alternates:     {
        en: "https://example.com/products/sensor?lang=en",
        fr: "https://example.com/products/sensor?lang=fr",
        "x-default": "https://example.com/products/sensor?lang=en",
    },
    locale:         "fr",
    image:          "https://example.com/sensor.jpg",
    imageAlt:       'Sensor "A"',
    type:           "website",
    structuredData: {
        "@context": "https://schema.org",
        name: "Sensor </script><script>alert(1)</script>",
    },
};

async function render(seo) {
    const result = await createInertiaApp({
        page:    {
            component: "Test",
            props: { seo, currentLocale: "fr" },
            url: "/",
            version: null,
            clearHistory: false,
            encryptHistory: false,
        },
        resolve: () => SeoHead,
        render:  renderToString,
        setup:   ({ App, props }) => createElement(App, props),
    });
    return result.head;
}

test("public head is keyed for replacement and JSON-LD cannot escape its script", async () => {
    const head = await render(publicSeo);
    const keys = head.map((tag) => tag.match(/data-inertia="([^"]*)"/)[1]);
    assert.equal(keys.length, new Set(keys).size);
    assert.ok(keys.includes("canonical"));
    assert.ok(keys.includes("alternate-fr"));
    assert.ok(keys.includes("description"));
    assert.ok(keys.includes("structured-data"));
    assert.equal(head.filter((tag) => tag.startsWith("<title ")).length, 1);
    assert.ok(head.some((tag) => tag.includes("Sensor &quot;A&quot;")));
    const json = head.find((tag) => tag.startsWith("<script "));
    assert.ok(!json.includes("</script><script>"));
    assert.deepEqual(
        JSON.parse(
            json.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, ""),
        ),
        publicSeo.structuredData,
    );
});

test("private head removes public metadata and restores it for a subsequent public page", async () => {
    const privateHead = await render({
        ...publicSeo,
        title: "Dashboard",
        robots: "noindex, nofollow",
        canonical: null,
        alternates: {},
        description: "",
        image: null,
        structuredData: {},
    });
    assert.equal(privateHead.length, 2);
    assert.ok(
        privateHead.some((tag) => tag.includes('content="noindex, nofollow"')),
    );
    assert.ok(
        privateHead.every(
            (tag) => !/canonical|og:|twitter:|application\/ld\+json/.test(tag),
        ),
    );
    const publicHead = await render(publicSeo);
    assert.ok(
        publicHead.some((tag) => tag.includes('data-inertia="canonical"')),
    );
    assert.ok(publicHead.every((tag) => !tag.includes("noindex")));
});
