import AuthLayout from "@/components/layouts/auth-layout";
import { createInertiaApp } from "@inertiajs/react";
import "../css/cubeta-starter.css";
import Layout from "@/components/layouts/layout";

createInertiaApp({
    layout: (name) => (authPages.includes(name) ? AuthLayout : Layout),
    defaults: {
        visitOptions: () => {
            return { viewTransition: true };
        },
    },
});

const authPages = [
    "login",
    "forget-password",
    "reset-password-code-form",
    "reset-password",
    "register",
];
