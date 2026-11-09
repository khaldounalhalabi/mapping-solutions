import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function SeoHead() {
    const { seo, currentLocale } = usePage().props;
    useEffect(() => {
        document.documentElement.lang = currentLocale;
        document.documentElement.dir = currentLocale === "ar" ? "rtl" : "ltr";
    }, [currentLocale]);

    return (
        <Head title={seo.title}>
            <meta head-key="robots" name="robots" content={seo.robots} />
            {seo.canonical && (
                <link
                    head-key="canonical"
                    rel="canonical"
                    href={seo.canonical}
                />
            )}
            {Object.entries(seo.alternates).map(([locale, href]) => (
                <link
                    key={locale}
                    head-key={`alternate-${locale}`}
                    rel="alternate"
                    hrefLang={locale}
                    href={href}
                />
            ))}
            {seo.description && (
                <meta
                    head-key="description"
                    name="description"
                    content={seo.description}
                />
            )}
            {seo.canonical && (
                <meta
                    head-key="og:url"
                    property="og:url"
                    content={seo.canonical}
                />
            )}
            {seo.canonical && (
                <meta
                    head-key="og:type"
                    property="og:type"
                    content={seo.type}
                />
            )}
            {seo.canonical && (
                <meta
                    head-key="og:title"
                    property="og:title"
                    content={seo.title}
                />
            )}
            {seo.canonical && (
                <meta
                    head-key="og:description"
                    property="og:description"
                    content={seo.description}
                />
            )}
            {seo.canonical && (
                <meta
                    head-key="og:site_name"
                    property="og:site_name"
                    content="Mapping Solutions"
                />
            )}
            {seo.canonical && (
                <meta
                    head-key="og:locale"
                    property="og:locale"
                    content={
                        { en: "en_GB", ar: "ar_AR", fr: "fr_FR" }[seo.locale] ??
                        seo.locale
                    }
                />
            )}
            {Object.keys(seo.alternates)
                .filter(
                    (locale) => locale !== seo.locale && locale !== "x-default",
                )
                .map((locale) => (
                    <meta
                        key={locale}
                        head-key={`og:locale:alternate-${locale}`}
                        property="og:locale:alternate"
                        content={
                            { en: "en_GB", ar: "ar_AR", fr: "fr_FR" }[locale] ??
                            locale
                        }
                    />
                ))}
            {seo.image && (
                <meta
                    head-key="og:image"
                    property="og:image"
                    content={seo.image}
                />
            )}
            {seo.image && (
                <meta
                    head-key="og:image:alt"
                    property="og:image:alt"
                    content={seo.imageAlt}
                />
            )}
            {seo.canonical && (
                <meta
                    head-key="twitter:card"
                    name="twitter:card"
                    content="summary_large_image"
                />
            )}
            {seo.canonical && (
                <meta
                    head-key="twitter:title"
                    name="twitter:title"
                    content={seo.title}
                />
            )}
            {seo.canonical && (
                <meta
                    head-key="twitter:description"
                    name="twitter:description"
                    content={seo.description}
                />
            )}
            {seo.image && (
                <meta
                    head-key="twitter:image"
                    name="twitter:image"
                    content={seo.image}
                />
            )}
            {seo.image && (
                <meta
                    head-key="twitter:image:alt"
                    name="twitter:image:alt"
                    content={seo.imageAlt}
                />
            )}
            {seo.canonical && (
                <script head-key="structured-data" type="application/ld+json">
                    {JSON.stringify(seo.structuredData)
                        .replace(/</g, "\\u003c")
                        .replace(/>/g, "\\u003e")
                        .replace(/&/g, "\\u0026")}
                </script>
            )}
        </Head>
    );
}
