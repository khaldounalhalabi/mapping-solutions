import { ReactNode } from "react";
import Navbar from "@/components/site/navbar/navbar";
import Footer from "@/components/site/footer/footer";

const SiteLayout = ({ children }: { children?: ReactNode }) => {
    return (
        <div className={"w-full h-full"}>
            <Navbar />
            <main className={"pt-5"}>{children}</main>
            <Footer />
        </div>
    );
};

export default SiteLayout;
