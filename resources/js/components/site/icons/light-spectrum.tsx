import { ComponentProps, useId } from "react";

const LightSpectrum = ({
    className,
    ...props
}: Omit<ComponentProps<"svg">, "viewBox" | "preserveAspectRatio">) => {
    const gradientId = useId();

    return (
        <svg
            className={["light-spectrum", className].filter(Boolean).join(" ")}
            viewBox="0 0 520 460"
            preserveAspectRatio="xMidYMid meet"
            {...props}
        >
            <defs>
                <linearGradient
                    id={`${gradientId}-bg1`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                >
                    <stop offset="0%" stopColor="#fff" stopOpacity="0"></stop>
                    <stop
                        offset="100%"
                        stopColor="#fff"
                        stopOpacity=".85"
                    ></stop>
                </linearGradient>
                <radialGradient id={`${gradientId}-pg1`}>
                    <stop offset="0%" stopColor="#fff" stopOpacity=".95"></stop>
                    <stop offset="100%" stopColor="#fff" stopOpacity="0"></stop>
                </radialGradient>
                <linearGradient
                    id={`${gradientId}-rg0`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                >
                    <stop
                        offset="0%"
                        stopColor="#2b3fd4"
                        stopOpacity=".95"
                    ></stop>
                    <stop
                        offset="100%"
                        stopColor="#2b3fd4"
                        stopOpacity="0"
                    ></stop>
                </linearGradient>
                <linearGradient
                    id={`${gradientId}-rg1`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                >
                    <stop
                        offset="0%"
                        stopColor="#1a9ed4"
                        stopOpacity=".95"
                    ></stop>
                    <stop
                        offset="100%"
                        stopColor="#1a9ed4"
                        stopOpacity="0"
                    ></stop>
                </linearGradient>
                <linearGradient
                    id={`${gradientId}-rg2`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                >
                    <stop
                        offset="0%"
                        stopColor="#12b886"
                        stopOpacity=".95"
                    ></stop>
                    <stop
                        offset="100%"
                        stopColor="#12b886"
                        stopOpacity="0"
                    ></stop>
                </linearGradient>
                <linearGradient
                    id={`${gradientId}-rg3`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                >
                    <stop
                        offset="0%"
                        stopColor="#f2c037"
                        stopOpacity=".95"
                    ></stop>
                    <stop
                        offset="100%"
                        stopColor="#f2c037"
                        stopOpacity="0"
                    ></stop>
                </linearGradient>
                <linearGradient
                    id={`${gradientId}-rg4`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                >
                    <stop
                        offset="0%"
                        stopColor="#f2762e"
                        stopOpacity=".95"
                    ></stop>
                    <stop
                        offset="100%"
                        stopColor="#f2762e"
                        stopOpacity="0"
                    ></stop>
                </linearGradient>
                <linearGradient
                    id={`${gradientId}-rg5`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                >
                    <stop
                        offset="0%"
                        stopColor="#d63b3b"
                        stopOpacity=".95"
                    ></stop>
                    <stop
                        offset="100%"
                        stopColor="#d63b3b"
                        stopOpacity="0"
                    ></stop>
                </linearGradient>
            </defs>

            <g className="prism-float">
                <rect
                    x="0"
                    y="213"
                    width="200"
                    height="6"
                    rx="3"
                    fill={`url(#${gradientId}-bg1)`}
                    opacity=".55"
                ></rect>
                <circle
                    className="pulse"
                    cx="120"
                    cy="216"
                    r="16"
                    fill={`url(#${gradientId}-pg1)`}
                ></circle>

                <path
                    className="facet"
                    d="M206 118 L318 300 L94 300 Z"
                    fill="#fff"
                ></path>
                <path
                    d="M206 118 L318 300 L94 300 Z"
                    fill="none"
                    stroke="rgba(255,255,255,.45)"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                ></path>

                <g>
                    <rect
                        className="ray"
                        x="286"
                        y="196"
                        width="250"
                        height="8"
                        rx="4"
                        fill={`url(#${gradientId}-rg0)`}
                        transform="rotate(-8 286 200)"
                    ></rect>
                    <rect
                        className="ray"
                        x="286"
                        y="216"
                        width="250"
                        height="8"
                        rx="4"
                        fill={`url(#${gradientId}-rg1)`}
                        transform="rotate(-4.8 286 220)"
                    ></rect>
                    <rect
                        className="ray"
                        x="286"
                        y="236"
                        width="250"
                        height="8"
                        rx="4"
                        fill={`url(#${gradientId}-rg2)`}
                        transform="rotate(-1.6 286 240)"
                    ></rect>
                    <rect
                        className="ray"
                        x="286"
                        y="256"
                        width="250"
                        height="8"
                        rx="4"
                        fill={`url(#${gradientId}-rg3)`}
                        transform="rotate(1.6 286 260)"
                    ></rect>
                    <rect
                        className="ray"
                        x="286"
                        y="276"
                        width="250"
                        height="8"
                        rx="4"
                        fill={`url(#${gradientId}-rg4)`}
                        transform="rotate(4.8 286 280)"
                    ></rect>
                    <rect
                        className="ray"
                        x="286"
                        y="296"
                        width="250"
                        height="8"
                        rx="4"
                        fill={`url(#${gradientId}-rg5)`}
                        transform="rotate(8 286 300)"
                    ></rect>
                </g>
            </g>
        </svg>
    );
};

export default LightSpectrum;
