import { HTMLProps } from "react";
import { cn } from "@/lib/utils";

const SpectrumLine = ({
    className,
    style,
    ...props
}: HTMLProps<HTMLDivElement>) => {
    return (
        <div
            style={{
                width:      "100%",
                background:
                    "linear-gradient(90deg,#2b3fd4,#1a9ed4,#12b886,#f2c037,#f2762e,#d63b3b)",
                margin:     "16px 0 18px",
                ...style,
            }}
            className={cn("h-0.5", className)}
            {...props}
        />
    );
};

export default SpectrumLine;
