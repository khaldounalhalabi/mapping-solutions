import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const SectionTitle = ({
    as: Tag = "h1",
    className,
    children,
    ...props
}: ComponentProps<"h1"> & { as?: "h1" | "h2" }) => {
    return (
        <Tag
            className={cn("text-navy font-bold text-4xl", className)}
            {...props}
        >
            {children}
        </Tag>
    );
};

export default SectionTitle;
