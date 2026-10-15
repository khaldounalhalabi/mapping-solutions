interface Media {
    url:       string;
    size:      number;
    extension: string;
    mime_type: string;
}

export function getFileNameFromUrl(url: string): string {
    try {
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname;
        const fileName = pathname.substring(pathname.lastIndexOf("/") + 1);
        return decodeURIComponent(fileName);
    } catch (e) {
        console.error("Invalid URL:", url);
        return "";
    }
}

export function isMedia(obj: any): obj is Media {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj?.url === "string" &&
        typeof obj.size === "number" &&
        typeof obj.extension === "string" &&
        typeof obj.mime_type === "string"
    );
}

export const DOCUMENT_MIME_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
    "text/csv",
];

export default Media;
