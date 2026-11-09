/** Generate public website links with the same locale as their canonical URL. */
export function siteRoute(
    name: string,
    parameters?: string | number | Record<string, unknown>,
): string {
    const url = new URL(String(route(name, parameters)));
    const locale =
        typeof document === "undefined" ? "en" : document.documentElement.lang;
    url.searchParams.set("lang", locale || "en");
    return url.href;
}
