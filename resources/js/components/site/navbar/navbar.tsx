import { asset } from "@/helper";
import PhoneLink from "@/components/site/navbar/phone-link";
import IsoWidget from "@/components/site/navbar/iso-widget";
import SearchInput from "@/components/site/navbar/search-input";
import NavLinks from "@/components/site/navbar/nav-links";

const Navbar = () => {
    return (
        <nav
            className={
                "z-10 bg-background sticky top-0 w-full px-22 py-5 shadow-2xl flex items-center justify-between"
            }
        >
            <img
                src={asset("/images/logo.jpg")}
                className={"w-50"}
                alt={"app-logo"}
            />
            <div className={"flex flex-col gap-8 items-end"}>
                <div className={"flex gap-5 items-center"}>
                    <PhoneLink />
                    <IsoWidget />
                    <SearchInput />
                </div>
                <NavLinks />
            </div>
        </nav>
    );
};

export default Navbar;
