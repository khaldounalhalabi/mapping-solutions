export function syncLocaleRouting(locale: string): void {
    if (typeof document === "undefined") return;
    Ziggy.defaults.locale = locale;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
}
