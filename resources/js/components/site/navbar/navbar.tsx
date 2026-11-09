import { siteRoute } from "@/lib/site-route";
import { translateKey } from "@/hooks/use-translation";
import { useTranslation } from "@/hooks/use-translation";
import LanguageDropdown from "@/components/dashboard/navbar/language-dropdown";
import { Link } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { useRef } from "react";
import { asset } from "@/helper";
import PhoneLink from "@/components/site/navbar/phone-link";
import IsoWidget from "@/components/site/navbar/iso-widget";
import NavLinks from "@/components/site/navbar/nav-links";
import CatalogueSearch from "@/components/site/products/catalogue-search";

const Navbar = () => {
    const { t } = useTranslation();
    const mobileMenu = useRef<HTMLDetailsElement>(null);

    return (
        <nav
            className={
                "z-10 bg-background sticky top-0 w-full px-8 xl:px-22 py-5 shadow-2xl flex items-center justify-between max-[1100px]:h-[76px] max-[1100px]:px-[26px] max-[1100px]:py-3 max-sm:h-[70px] max-sm:px-5"
            }
        >
            <Link
                href={siteRoute("site.index")}
                aria-label={translateKey("site.copy.mapping_solutions_home")}
            >
                <img
                    src={asset("/images/logo.jpg")}
                    className={
                        "h-auto w-50 max-[1100px]:w-36 max-sm:w-28 max-[380px]:w-24"
                    }
                    alt="Mapping Solutions"
                    width={1600}
                    height={788}
                />
            </Link>
            <div
                className={"flex flex-col gap-8 items-end max-[1100px]:hidden"}
            >
                <div className={"flex gap-5 items-center"}>
                    <LanguageDropdown appearance="website" />
                    <PhoneLink />
                    <IsoWidget />
                    <CatalogueSearch compact />
                </div>
                <NavLinks />
            </div>
            <div className="hidden shrink-0 items-center gap-2 max-[1100px]:flex">
                <LanguageDropdown appearance="website" />
                <details ref={mobileMenu}>
                    <summary className="flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-md border px-3 py-2 text-sm font-bold max-[380px]:px-2.5 [&::-webkit-details-marker]:hidden">
                        <Menu size={20} />
                        <span className="max-[380px]:sr-only">
                            {t("site.navigation.menu")}
                        </span>
                    </summary>
                    <div className="absolute top-full end-0 start-0 max-h-[calc(100dvh-76px)] max-sm:max-h-[calc(100dvh-70px)] overflow-y-auto border-t bg-background px-[26px] py-4 shadow-lg">
                        <div className="mb-4">
                            <CatalogueSearch
                                compact
                                onResultSelect={() => {
                                    mobileMenu.current?.removeAttribute("open");
                                }}
                            />
                        </div>
                        <NavLinks mobile />
                    </div>
                </details>
            </div>
        </nav>
    );
};

export default Navbar;
