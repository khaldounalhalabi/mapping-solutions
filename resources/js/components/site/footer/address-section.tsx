import { siteRoute } from "@/lib/site-route";
import { translateKey } from "@/hooks/use-translation";
import { GlobeIcon } from "lucide-react";
import useSettings from "@/hooks/use-settings";
import SettingKeyEnum from "@/enums/setting-key-enum";

const AddressSection = () => {
    const { valueOf } = useSettings();
    return (
        <div
            className={"flex flex-col items-start justify-between h-full gap-3"}
        >
            <div className={"flex items-center gap-2"}>
                <GlobeIcon className={"text-white"} />
                <h2 className={"text-white text-lg font-extrabold"}>
                    Mapping Solutions Ltd
                </h2>
            </div>
            <a
                href={`${valueOf(SettingKeyEnum.ADDRESS_GOOGLE_MAP_URL)}`}
                target="_blank"
            >
                <p
                    className={
                        "text-white/60 text-sm  max-w-50 wrap-break-word"
                    }
                >
                    {valueOf(SettingKeyEnum.ADDRESS)}
                </p>
            </a>
            <a
                href={`tel:${valueOf(SettingKeyEnum.CONTACT_PHONE)}`}
                className={"text-white/60 text-sm"}
                target={"_blank"}
            >
                {valueOf(SettingKeyEnum.CONTACT_PHONE)}
            </a>
            <div className={"flex items-center justify-between gap-2"}>
                <a
                    className={"text-danger hover:text-white text-xs font-bold"}
                    href="/sitemap.xml"
                >
                    {translateKey("site.copy.sitemap")}{" "}
                </a>
                <a
                    className={"text-danger hover:text-white text-xs font-bold"}
                    href={siteRoute("site.privacy.policy")}
                >
                    {translateKey("site.copy.privacy")}{" "}
                </a>
                <a
                    className={"text-danger hover:text-white text-xs font-bold"}
                    href={siteRoute("site.terms.and.conditions")}
                >
                    {translateKey("site.copy.terms")}{" "}
                </a>
            </div>
        </div>
    );
};

export default AddressSection;
