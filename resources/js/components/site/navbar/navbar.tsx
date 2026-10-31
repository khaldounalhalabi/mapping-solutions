import { Link } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { asset } from "@/helper";
import PhoneLink from "@/components/site/navbar/phone-link";
import IsoWidget from "@/components/site/navbar/iso-widget";
import SearchInput from "@/components/site/navbar/search-input";
import NavLinks from "@/components/site/navbar/nav-links";

const Navbar = () => {
    return (
        <nav
            className={
                "z-10 bg-background sticky top-0 w-full px-22 py-5 shadow-2xl flex items-center justify-between max-[1100px]:h-[76px] max-[1100px]:px-[26px] max-[1100px]:py-3 max-sm:h-[70px]"
            }
        >
            <Link
                href={route("site.index")}
                aria-label="Mapping Solutions home"
            >
                <img
                    src={asset("/images/logo.jpg")}
                    className={"w-50 max-[1100px]:w-36 max-sm:w-32"}
                    alt={"app-logo"}
                />
            </Link>
            <div
                className={"flex flex-col gap-8 items-end max-[1100px]:hidden"}
            >
                <div className={"flex gap-5 items-center"}>
                    <PhoneLink />
                    <IsoWidget />
                    <SearchInput />
                </div>
                <NavLinks />
            </div>
            <details className="hidden max-[1100px]:block">
                <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md border px-3 py-2 text-sm font-bold [&::-webkit-details-marker]:hidden">
                    <Menu size={20} />
                    Menu
                </summary>
                <div className="absolute top-full right-0 left-0 max-h-[calc(100dvh-76px)] overflow-y-auto border-t bg-background px-[26px] py-4 shadow-lg">
                    <NavLinks mobile />
                </div>
            </details>
        </nav>
    );
};

export default Navbar;
