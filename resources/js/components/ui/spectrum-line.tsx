import { HTMLProps } from "react";
import { cn } from "@/lib/utils";

const SpectrumLine = ({ className, ...props }: HTMLProps<HTMLDivElement>) => {
    return (
        <div className={cn("h-0.5 w-full bg-spectrum", className)} {...props} />
    );
};

export default SpectrumLine;
