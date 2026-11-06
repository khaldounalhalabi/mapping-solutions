import { ComponentProps } from "react";
import { Link, usePage } from "@inertiajs/react";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MoveLink = ({
    className,
    children,
    dir = "forward",
    ...props
}: ComponentProps<typeof Link> & { dir?: "back" | "forward" }) => {
    const {
        props: { currentLocale },
    } = usePage();

    return (
        <Link
            className={cn(
                "group-hover:gap-2 font-bold text-xs text-danger flex gap-1 hover:gap-2 transition-all items-center",
                className,
            )}
            {...props}
        >
            {dir == "back" &&
                ((currentLocale as string) == "ar" ? (
                    <MoveRightIcon className={"size-2"} viewBox={"0 0 24 18"} />
                ) : (
                    <MoveLeftIcon className={"size-2"} viewBox={"0 0 24 18"} />
                ))}
            {children}
            {dir == "forward" &&
                ((currentLocale as string) == "ar" ? (
                    <MoveLeftIcon className={"size-2"} viewBox={"0 0 24 18"} />
                ) : (
                    <MoveRightIcon className={"size-2"} viewBox={"0 0 24 18"} />
                ))}
        </Link>
    );
};

export default MoveLink;
