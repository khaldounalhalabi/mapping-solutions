export function languageSwitchUrl(currentUrl: string, locale: string): string {
    const url = new URL(currentUrl);
    if (url.searchParams.has("lang")) {
        url.searchParams.set("lang", locale);
    }
    return url.href;
}
