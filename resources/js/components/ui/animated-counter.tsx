import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
    value:     number;
    suffix?:   string;
    duration?: number;
}

const AnimatedCounter = ({
    value,
    suffix = "",
    duration = 1800,
}: AnimatedCounterProps) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let animationFrame: number;
        let hasAnimated = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || hasAnimated) return;

                hasAnimated = true;
                observer.disconnect();

                if (
                    window.matchMedia("(prefers-reduced-motion: reduce)")
                        .matches
                ) {
                    setCount(value);
                    return;
                }

                let startTime: number | null = null;

                const animate = (timestamp: number) => {
                    if (startTime === null) startTime = timestamp;

                    const progress = Math.min(
                        (timestamp - startTime) / duration,
                        1,
                    );

                    // Ease-out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);

                    setCount(Math.round(eased * value));

                    if (progress < 1) {
                        animationFrame = requestAnimationFrame(animate);
                    }
                };

                animationFrame = requestAnimationFrame(animate);
            },
            { threshold: 0.3 },
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrame);
        };
    }, [value, duration]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
};

export default AnimatedCounter;
