import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { isUrlActive } from "@/helper";

const NavLinks = () => {
    const LINKS = [
        {
            link:  route("site.index"),
            title: "home",
        },
        {
            link:  "#",
            title: "products",
        },
        {
            link:  "#",
            title: "applications",
        },
        {
            link:  "#",
            title: "suppliers",
        },
        {
            link:  "#",
            title: "services",
        },
        {
            link:  "#",
            title: "news",
        },
        {
            link:  "#",
            title: "about",
        },
        {
            link:  "#",
            title: "careers",
        },
        {
            link:  "#",
            title: "contact",
        },
    ];
    return (
        <ul className={"flex gap-9 items-center justify-between"}>
            {LINKS.map((l) => (
                <Link
                    href={l.link}
                    className={cn(
                        "uppercase hover:text-link font-bold text-sm",
                        isUrlActive(l.link) ? "text-link" : "text-foreground",
                    )}
                >
                    {l.title}
                </Link>
            ))}
        </ul>
    );
};

export default NavLinks;
