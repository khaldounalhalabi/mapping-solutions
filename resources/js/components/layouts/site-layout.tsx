import SeoHead from "@/components/seo-head";
import { usePage } from "@inertiajs/react";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { ReactNode } from "react";
import Navbar from "@/components/site/navbar/navbar";
import Footer from "@/components/site/footer/footer";
import WhatsappChat from "@/components/site/whatsapp-chat";

const SiteLayout = ({ children }: { children?: ReactNode }) => {
    const page = usePage();
    const { currentLocale } = page.props;
    return (
        <DirectionProvider direction={currentLocale === "ar" ? "rtl" : "ltr"}>
            <div className={"site-layout w-full h-full"}>
                <SeoHead />
                <Navbar />
                <main>{children}</main>
                <Footer />
                <WhatsappChat />
            </div>
        </DirectionProvider>
    );
};

export default SiteLayout;
