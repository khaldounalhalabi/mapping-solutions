import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const LinedTitle = ({
    children,
    className,
    style,
    ...props
}: ComponentProps<"p">) => {
    return (
        <p
            className={cn(
                "my-5.5 mb-3 flex items-center gap-2.5",
                "text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#555]",
                "after:h-px after:flex-1 after:bg-[#0B2140]/12 after:content-['']",
                className,
            )}
            {...props}
        >
            {children}
        </p>
    );
};

export default LinedTitle;
