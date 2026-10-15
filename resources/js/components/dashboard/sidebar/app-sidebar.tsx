import {
    BoxesIcon,
    CircuitBoardIcon,
    FactoryIcon,
    FolderTreeIcon,
    LayoutDashboardIcon,
    PackageIcon,
} from "lucide-react";
import { NavMain } from "@/components/dashboard/sidebar/nav-main";
import { NavUser } from "@/components/dashboard/sidebar/nav-user";
import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";

export function AppSidebar({
    ...props
}: React.ComponentProps<typeof ShadcnSidebar>) {
    const { t } = useTranslation();
    const sidebarItems: {
        title: string;
        href?: string;
        icon?: React.ReactNode;
        children?: {
            title: string;
            href?: string;
            icon?: React.ReactNode;
        }[];
    }[] = [
        {
            title: "Product Catalogue",
            icon: <BoxesIcon />,
            children: [
                {
                    title: "Suppliers",
                    href: route("v1.web.protected.suppliers.index"),
                    icon: <FactoryIcon />,
                },
                {
                    title: "Product Families",
                    href: route("v1.web.protected.product.families.index"),
                    icon: <FolderTreeIcon />,
                },
                {
                    title: "Product Technologies",
                    href: route("v1.web.protected.product.technologies.index"),
                    icon: <CircuitBoardIcon />,
                },
                {
                    title: "Products",
                    href: route("v1.web.protected.products.index"),
                    icon: <PackageIcon />,
                },
            ],
        },
    ];

    const {
        props: { authUser },
    } = usePage();
    return (
        <ShadcnSidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                            render={
                                <Link
                                    className={"flex items-center gap-2"}
                                    href={route("v1.web.protected.index")}
                                >
                                    <LayoutDashboardIcon />
                                    <span className="text-base font-semibold">
                                        {t("dashboard.name")}
                                    </span>
                                </Link>
                            }
                        ></SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={sidebarItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={authUser} />
            </SidebarFooter>
        </ShadcnSidebar>
    );
}
