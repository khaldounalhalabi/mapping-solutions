import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { ComponentProps } from "react";
import { useTranslation } from "@/hooks/use-translation";

const ArrowUpRightIcon = (props: ComponentProps<typeof ArrowUpRight>) => {
    const { locale } = useTranslation();
    return locale == "ar" ? (
        <ArrowUpLeft {...props} />
    ) : (
        <ArrowUpRight {...props} />
    );
};

export default ArrowUpRightIcon;
