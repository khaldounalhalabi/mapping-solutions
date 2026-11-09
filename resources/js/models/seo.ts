export interface Seo {
    title:          string;
    description:    string;
    robots:         string;
    canonical:      string | null;
    alternates:     Record<string, string>;
    locale:         string;
    image:          string | null;
    imageAlt:       string;
    type:           string;
    structuredData: Record<string, unknown>;
}
