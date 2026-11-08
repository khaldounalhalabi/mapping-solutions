import { ComponentProps } from "react";
import { useTranslation } from "@/hooks/use-translation";
import {
    MoveLeftIcon,
    MoveRightIcon as LucidMoveRightIcon,
} from "lucide-react";

const MoveRightIcon = (
    props: ComponentProps<typeof MoveLeftIcon | typeof LucidMoveRightIcon>,
) => {
    const { locale } = useTranslation();
    return locale == "ar" ? (
        <MoveLeftIcon {...props} />
    ) : (
        <LucidMoveRightIcon {...props} />
    );
};

export default MoveRightIcon;
