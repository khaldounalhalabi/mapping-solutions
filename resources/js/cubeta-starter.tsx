import AuthLayout from "@/components/layouts/auth-layout";
import { createInertiaApp } from "@inertiajs/react";
import "../css/cubeta-starter.css";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import SiteLayout from "@/components/layouts/site-layout";

createInertiaApp({
    layout: (name) => {
        const isDashboardPage = name.includes("dashboard");

        if (isDashboardPage) {
            return authPages.includes(name) ? AuthLayout : DashboardLayout;
        }

        return SiteLayout;
    },
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
