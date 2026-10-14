import inertia from "@inertiajs/vite";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig(({ command }) => ({
    plugins: [
        laravel({
            input: ["resources/js/cubeta-starter.tsx"],
            refresh: true,
        }),
        inertia(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
            ...(command === "serve"
                ? {
                      "lucide-react/dynamic": path.resolve(
                          import.meta.dirname,
                          "./resources/js/lib/lucide-dynamic-stub.tsx",
                      ),
                  }
                : {}),
        },
    },
    server: {
        watch: {
            ignored: ["**/storage/framework/views/**"],
        },
    },
}));
