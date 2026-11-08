import { useTranslation } from "@/hooks/use-translation";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { isUrlActive } from "@/helper";

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
    const { t } = useTranslation();
    const LINKS = [
        {
            link:  route("site.index"),
            title: t("site.navigation.home"),
        },
        {
            link:  route("site.products"),
            title: t("site.navigation.products"),
        },
        {
            link:  route("site.applications"),
            title: t("site.navigation.applications"),
        },
        {
            link:  route("site.suppliers"),
            title: t("site.navigation.suppliers"),
        },
        {
            link:  route("site.services"),
            title: t("site.navigation.services"),
        },
        {
            link:  route("site.news"),
            title: t("site.navigation.news"),
        },
        {
            link:  route("site.about"),
            title: t("site.navigation.about"),
        },
        {
            link:  route("site.careers"),
            title: t("site.navigation.careers"),
        },
        {
            link:  route("site.contact"),
            title: t("site.navigation.contact"),
        },
    ];
    return (
        <ul
            className={
                mobile
                    ? "flex flex-col items-stretch gap-1"
                    : "flex gap-4 xl:gap-9 items-center justify-between"
            }
            onClick={(event) => {
                if (mobile && (event.target as HTMLElement).closest("a"))
                    event.currentTarget
                        .closest("details")
                        ?.removeAttribute("open");
            }}
        >
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
                            mobile && "px-5 py-3",
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
