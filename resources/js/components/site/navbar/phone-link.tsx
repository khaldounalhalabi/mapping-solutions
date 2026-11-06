import { PhoneIcon } from "lucide-react";
import useSettings from "@/hooks/use-settings";
import SettingKeyEnum from "@/enums/setting-key-enum";

const PhoneLink = () => {
    const { valueOf } = useSettings();
    return (
        <a
            href={`tel:${valueOf(SettingKeyEnum.CONTACT_PHONE)}`}
            className={
                "flex shrink-0 items-center gap-2 whitespace-nowrap hover:text-link"
            }
        >
            <PhoneIcon className={"text-success"} />
            <p className={"font-extrabold text-xl"}>
                {valueOf(SettingKeyEnum.CONTACT_PHONE)}
            </p>
        </a>
    );
};

export default PhoneLink;
