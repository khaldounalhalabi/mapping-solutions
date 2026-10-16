import { usePage } from "@inertiajs/react";

export const asset = (path: string) => {
    const {
        props: { asset },
    } = usePage();
    if (path.startsWith("/")) {
        path = path.replace("/", "");
    }

    return `${asset}${path}`;
};

export function getNestedPropertyValue(object: any, path: string): any {
    const properties = path.split(".");
    let value = object;
    for (const property of properties) {
        if (value?.hasOwnProperty(property)) {
            value = value[`${property}`];
        } else {
            return undefined;
        }
    }
    return value;
}

export function uniqueBy<T, K extends keyof T>(array: T[], key: K): T[] {
    return Array.from(new Map(array.map((item) => [item[key], item])).values());
}

export const toTitleCase = (str: string): string => {
    return (
        str
            .toLowerCase()
            // replace separators with spaces
            .replace(/[_\-@,.]+/g, " ")
            // normalize multiple spaces
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    );
};

export function getEnumValues<T extends object>(enumObj: T): T[keyof T][] {
    return Object.values(enumObj).filter(
        (value) => typeof value === "string" || typeof value === "number",
    ) as T[keyof T][];
}
