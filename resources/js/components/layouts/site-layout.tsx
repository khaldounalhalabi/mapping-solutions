import { LocalizationKey, useTranslation } from "@/hooks/use-translation";
import { Head, usePage } from "@inertiajs/react";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { ReactNode } from "react";
import Navbar from "@/components/site/navbar/navbar";
import Footer from "@/components/site/footer/footer";

const SiteLayout = ({ children }: { children?: ReactNode }) => {
    const page = usePage();
    const { currentLocale } = page.props;
    const { t } = useTranslation();
    const section = page.component.split("/")[1];
    const titles: Record<string, LocalizationKey> = {
        index:        "site.navigation.home",
        products:     "site.navigation.products",
        applications: "site.navigation.applications",
        suppliers:    "site.navigation.suppliers",
        services:     "site.navigation.services",
        news:         "site.navigation.news",
        about:        "site.navigation.about",
        careers:      "site.navigation.careers",
        contact:      "site.navigation.contact",
        legal:        "site.legal.label",
    };
    return (
        <DirectionProvider direction={currentLocale === "ar" ? "rtl" : "ltr"}>
            <div className={"site-layout w-full h-full"}>
                <Head
                    title={`${t(titles[section] ?? "site.navigation.home")} | Mapping Solutions`}
                />
                <Navbar />
                <main>{children}</main>
                <Footer />
            </div>
        </DirectionProvider>
    );
};

export default SiteLayout;
