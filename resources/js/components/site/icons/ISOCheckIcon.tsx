import { ComponentProps } from "react";

const IsoCheckIcon = (
    props: Omit<
        ComponentProps<"svg">,
        "width" | "height" | "viewBox" | "fill" | "aria-hidden"
    >,
) => {
    return (
        <svg
            width="26"
            height="26"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
            {...props}
        >
            <circle
                cx="24"
                cy="24"
                r="21"
                stroke="#0b2140"
                strokeWidth="2.6"
            ></circle>
            <circle
                cx="24"
                cy="24"
                r="16.5"
                stroke="#0b2140"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity=".4"
            ></circle>
            <path
                d="M16 24.4l5.4 5.4L32.5 18.7"
                stroke="#0e8074"
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
        </svg>
    );
};

export default IsoCheckIcon;
