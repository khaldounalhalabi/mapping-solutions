import "@inertiajs/core";
import User from "@/models/user";
import { route as routeFn } from "ziggy-js";
import { AvailableLocales } from "@/models/translatable";
import { Setting } from "@/models/setting";

interface Paginated<T> {
    data:           T[];
    current_page:   number;
    first_page_url: string;
    from:           number | null;
    last_page:      number;
    last_page_url:  string;
    links:          {
        url:    string | null;
        label:  string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path:          string;
    per_page:      number;
    prev_page_url: string | null;
    to:            number | null;
    total:         number;
}

declare module "@inertiajs/core" {
    export interface InertiaConfig {
        sharedPageProps: {
            formProtectionToken: string;
            availableLocales:    AvailableLocales[];
            currentLocale:       AvailableLocales;
            authUser?:           User;
            asset:               string;
            baseUrl:             string;
            settings:            Setting[];
            suppliers_count:     number;
            products_count:      number;
        };
        flashDataType: {
            error?:   string;
            success?: string;
        };
        errorValueType: string[] | string;
    }
}

declare global {
    var route: typeof routeFn;
}
