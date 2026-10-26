import { ComponentProps } from "react";
import { Link } from "@inertiajs/react";
import { MoveRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MoveLink = ({
    className,
    children,
    ...props
}: ComponentProps<typeof Link>) => {
    return (
        <Link
            className={cn(
                "group-hover:gap-2 font-bold text-xs text-danger flex flex-1 gap-1 hover:gap-2 transition-all items-center",
                className,
            )}
            {...props}
        >
            {children}
            <MoveRightIcon className={"size-2"} viewBox={"0 0 24 18"} />
        </Link>
    );
};

export default MoveLink;
