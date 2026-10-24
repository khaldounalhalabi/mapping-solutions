import { ReactNode } from "react";
import Navbar from "@/components/site/navbar/navbar";

const SiteLayout = ({ children }: { children?: ReactNode }) => {
    return (
        <div className={"w-full h-full"}>
            <Navbar />
            {children}
        </div>
    );
};

export default SiteLayout;
