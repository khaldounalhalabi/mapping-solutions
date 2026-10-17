import AuthLayout from "@/components/layouts/auth-layout";
import { createInertiaApp } from "@inertiajs/react";
import "../css/cubeta-starter.css";
import DashboardLayout from "@/components/layouts/dashboard-layout";

createInertiaApp({
    layout:   (name) =>
        authPages.includes(name) ? AuthLayout : DashboardLayout,
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
