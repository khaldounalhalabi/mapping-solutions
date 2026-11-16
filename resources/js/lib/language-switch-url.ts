export function languageSwitchUrl(currentUrl: string, locale: string): string {
    const url = new URL(currentUrl);
    const segments = url.pathname.split("/");
    segments[1] = locale;
    url.pathname = segments.join("/");
    return url.href;
}
