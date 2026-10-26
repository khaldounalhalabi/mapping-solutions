import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const SectionTitle = ({
    className,
    children,
    ...props
}: ComponentProps<"h1">) => {
    return (
        <h1
            className={cn("text-navy font-bold text-4xl", className)}
            {...props}
        >
            {children}
        </h1>
    );
};

export default SectionTitle;
