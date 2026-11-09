import { siteRoute } from "@/lib/site-route";
import { formatNumber, translateKey } from "@/hooks/use-translation";
import ProductTechnology from "@/models/product-technology";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "lucide-react/dynamic";
import { SearchIcon } from "lucide-react";
import { translate } from "@/models/translatable";
import LinedTitle from "@/components/ui/lined-title";
import { Link } from "@inertiajs/react";
import ArrowRightIcon from "@/components/site/icons/arrow-right-icon";

const ProductTechnologiesGrid = ({
    technologies,
}: {
    technologies: ProductTechnology[];
}) => {
    return (
        <div className={"mt-5 w-full"}>
            <LinedTitle>
                {" "}
                {translateKey("site.copy.browse_by_technology")}{" "}
            </LinedTitle>
            <div
                className={
                    "grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                }
            >
                {technologies.map((tech) => (
                    <Link
                        key={tech.id}
                        className="group shadow-xl rounded-xl flex flex-col w-full min-w-0 h-full min-h-60.5 hover:-translate-y-2 transition-all duration-700"
                        href={siteRoute(
                            "site.products.product.technologies.show",
                            {
                                productTechnologySlug: tech.slug,
                            },
                        )}
                    >
                        <div
                            className="relative isolate flex h-4/5 w-full items-center justify-center overflow-hidden rounded-t-xl before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/2 before:z-10 before:w-1/2 before:translate-x-0 before:skew-x-[-25deg] before:bg-linear-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-transform before:duration-700 before:ease-in-out group-hover:before:translate-x-[400%]"
                            style={{
                                background: `linear-gradient(155deg, ${tech.color},color-mix(in srgb, ${tech.color} 80%, #000 16%))`,
                            }}
                        >
                            <Button
                                size="icon-lg"
                                className="bg-background hover:bg-background p-6 transition-transform duration-700 group-hover:-rotate-8"
                            >
                                {tech.icon ? (
                                    <img
                                        loading="lazy"
                                        decoding="async"
                                        src={tech.icon.url}
                                        alt={`${tech.name}-icon`}
                                    />
                                ) : tech.icon_key ? (
                                    <DynamicIcon
                                        name={tech.icon_key}
                                        className="size-6"
                                        style={{
                                            color: tech.color ?? "",
                                        }}
                                    />
                                ) : (
                                    <SearchIcon />
                                )}
                            </Button>
                        </div>
                        <div className="h-1/5 flex items-center gap-2 font-bold text-navy justify-center text-center">
                            <p className={"flex items-center flex-col"}>
                                <span className={"text-sm font-extrabold"}>
                                    {translate(tech.name)}
                                </span>
                                <span
                                    className={
                                        "text-paragraph text-xs font-light"
                                    }
                                >
                                    {formatNumber(tech.suppliers_count ?? 0)}{" "}
                                    {translateKey("site.copy.manufacturers")}{" "}
                                    {tech.products_count &&
                                    tech.products_count > 0 ? (
                                        <span>
                                            .{" "}
                                            {formatNumber(
                                                tech.products_count ?? 0,
                                            )}{" "}
                                            {translateKey(
                                                "site.copy.products",
                                            )}{" "}
                                        </span>
                                    ) : null}
                                </span>
                            </p>
                            <ArrowRightIcon className="rtl:rotate-180 size-4 w-0 opacity-0 -translate-x-2 transition-all duration-500 ease-in-out group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductTechnologiesGrid;
