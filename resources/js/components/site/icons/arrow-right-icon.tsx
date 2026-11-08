import {
    ArrowLeftIcon,
    ArrowRightIcon as LucidArrowRightIcon,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { ComponentProps } from "react";

const ArrowRightIcon = (props: ComponentProps<typeof LucidArrowRightIcon>) => {
    const { locale } = useTranslation();
    return locale == "ar" ? (
        <ArrowLeftIcon {...props} />
    ) : (
        <LucidArrowRightIcon {...props} />
    );
};

export default ArrowRightIcon;
