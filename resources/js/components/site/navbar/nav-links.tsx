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
            link:  route("site.products"),
            title: "products",
        },
        {
            link:  "#",
            title: "applications",
        },
        {
            link:  route("site.suppliers"),
            title: "suppliers",
        },
        {
            link:  route("site.services"),
            title: "services",
        },
        {
            link:  route("site.news"),
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
            {LINKS.map((l) => {
                let isActive = isUrlActive(l.link);
                if (
                    l.link == route("site.index") &&
                    !route().current("site.index")
                ) {
                    isActive = false;
                }

                return (
                    <Link
                        href={l.link}
                        key={l.link + "-id-" + l.title}
                        className={cn(
                            "uppercase hover:text-link font-bold text-sm",
                            isActive ? "text-link" : "text-foreground",
                        )}
                    >
                        {l.title}
                    </Link>
                );
            })}
        </ul>
    );
};

export default NavLinks;
