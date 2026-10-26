import { ReactNode } from "react";
import Navbar from "@/components/site/navbar/navbar";

const SiteLayout = ({ children }: { children?: ReactNode }) => {
    return (
        <div className={"w-full h-full"}>
            <Navbar />
            <main className={"py-5"}>{children}</main>
        </div>
    );
};

export default SiteLayout;
