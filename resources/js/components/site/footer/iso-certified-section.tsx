import { translateKey } from "@/hooks/use-translation";
import IsoCheckIcon from "@/components/site/icons/ISOCheckIcon";

import { Link } from "@inertiajs/react";
import { useTranslation } from "@/hooks/use-translation";

const IsoCertifiedSection = () => {
    const { t } = useTranslation();
    return (
        <div className={"flex flex-col items-center h-full gap-5"}>
            <div className={"flex items-center gap-2"}>
                <div
                    className={
                        "flex items-center border rounded-md px-5 py-3 gap-5 bg-white w-full h-20"
                    }
                >
                    <IsoCheckIcon className={"size-10"} />
                    <div className={"flex flex-col items-start"}>
                        <strong className={"font-extrabold text-xl"}>
                            ISO 9001
                        </strong>
                        <p
                            className={
                                "text-navy font-bold text-[0.6rem] uppercase tracking-wider"
                            }
                        >
                            {" "}
                            {translateKey("site.copy.certified_quality")}{" "}
                        </p>
                        <p
                            className={
                                "text-navy font-bold text-[0.6rem] uppercase tracking-wider"
                            }
                        >
                            {" "}
                            {translateKey("site.copy.management")}{" "}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <nav
                    aria-label={t("site.legal.navigation")}
                    className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-white/80"
                >
                    <Link
                        href={route("site.privacy.policy")}
                        className="hover:text-white hover:underline"
                    >
                        {t("site.legal.privacy_policy")}
                    </Link>
                    <Link
                        href={route("site.terms.and.conditions")}
                        className="hover:text-white hover:underline"
                    >
                        {t("site.legal.terms_and_conditions")}
                    </Link>
                </nav>
                <p className={"text-white text-sm font-bold text-center"}>
                    {translateKey("site.copy.copyright", {
                        year: new Date().getFullYear(),
                    })}
                </p>
            </div>
        </div>
    );
};

export default IsoCertifiedSection;
