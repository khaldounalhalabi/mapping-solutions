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
    "dashboard/login",
    "dashboard/forget-password",
    "dashboard/reset-password-code-form",
    "dashboard/reset-password",
    "dashboard/register",
];
