import { ReactNode, useEffect, useRef } from "react";

export default function PublicReveals({
    className,
    children,
}: {
    className: string;
    children: ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const root = ref.current;
        if (!root) return;
        const frame = requestAnimationFrame(() =>
            root.querySelector(".hero")?.classList.add("ready"),
        );
        const items = root.querySelectorAll(".rv, .stag");
        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            !("IntersectionObserver" in window)
        ) {
            items.forEach((item) => item.classList.add("on"));
            return () => cancelAnimationFrame(frame);
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("on");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
        );
        items.forEach((item) => observer.observe(item));
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
        };
    }, []);
    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
