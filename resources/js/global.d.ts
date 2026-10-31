import "@inertiajs/core";
import User from "@/models/user";
import { route as routeFn } from "ziggy-js";
import { AvailableLocales } from "@/models/translatable";
import { Setting } from "@/models/setting";

declare module "@inertiajs/core" {
    export interface InertiaConfig {
        sharedPageProps: {
            availableLocales: AvailableLocales[];
            currentLocale:    AvailableLocales;
            authUser?:        User;
            asset:            string;
            baseUrl:          string;
            settings:         Setting[];
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
