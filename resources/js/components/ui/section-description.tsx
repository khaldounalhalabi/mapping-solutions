import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const SectionDescription = ({
    className,
    children,
    ...props
}: ComponentProps<"p">) => {
    return (
        <p
            className={cn("text-sm text-paragraph max-w-2/3", className)}
            {...props}
        >
            {children}
        </p>
    );
};

export default SectionDescription;
