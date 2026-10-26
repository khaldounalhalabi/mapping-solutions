import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const SectionKicker = ({
    className,
    children,
    ...props
}: ComponentProps<"span">) => {
    return (
        <span
            className={cn(
                "mb-3 inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-navy-secondary before:h-1 before:w-6 before:shrink-0 before:rounded-sm before:bg-spectrum before:content-['']",
                className,
            )}
            {...props}
        >
            {children}
        </span>
    );
};

export default SectionKicker;
