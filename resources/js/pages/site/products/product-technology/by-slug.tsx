import { siteRoute } from "@/lib/site-route";
import { formatNumber, translateKey } from "@/hooks/use-translation";
import SpectrumLine from "@/components/ui/spectrum-line";
import ProductTechnology from "@/models/product-technology";
import { translate } from "@/models/translatable";
import LinedTitle from "@/components/ui/lined-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import MoveLink from "@/components/ui/move-link";
import CatalogueSearch from "@/components/site/products/catalogue-search";
import MoveRightIcon from "@/components/site/icons/move-right-icon";

const BySlug = ({
    productTechnology,
}: {
    productTechnology: ProductTechnology;
}) => {
    return (
        <div>
            <section
                className={
                    "relative flex h-full bg-hero flex-col items-start px-5 sm:px-10 lg:px-16 xl:px-48 py-10 gap-5"
                }
            >
                <SpectrumLine className={"w-16 h-1"} />
                <p
                    className={
                        "text-navy-hero uppercase font-extrabold text-xs starting:translate-y-5 starting:opacity-0 translate-0 opacity-100 transition-all duration-700 ease-out"
                    }
                >
                    {" "}
                    {translateKey("site.copy.product_catalogue")}{" "}
                </p>
                <h1
                    className={
                        "text-4xl text-white font-extrabold starting:translate-y-6 starting:opacity-0 translate-0 opacity-100 transition-all duration-800 ease-out"
                    }
                >
                    {translate(productTechnology.name)}
                </h1>
                <div
                    className={
                        "w-full max-w-2xl lg:absolute lg:-bottom-15 flex flex-col gap-4 items-start"
                    }
                >
                    <CatalogueSearch
                        product_technology_id={productTechnology.id}
                    />
                    <p className={"text-paragraph text-xs"}>
                        {" "}
                        {translateKey(
                            "site.copy.try_a_product_name_model_number_or_manufacturer_results_appear_as_you_type",
                        )}{" "}
                    </p>
                </div>
            </section>

            <div className={"py-16 px-page-padding"}>
                <LinedTitle>
                    {formatNumber(productTechnology.suppliers?.length ?? 0)}{" "}
                    {translateKey("site.copy.manufacturers")}{" "}
                </LinedTitle>
                <div
                    className={
                        "shadow-md rounded-md flex flex-col items-start w-full border-2 border-gray-200"
                    }
                >
                    {productTechnology.suppliers?.map((s) => (
                        <Link
                            href={siteRoute(
                                "site.products.product.technologies.suppliers.index",
                                {
                                    productTechnologySlug:
                                        productTechnology.slug,
                                    supplierSlug:          s.slug,
                                },
                            )}
                            className={
                                "flex flex-col items-start gap-5 lg:flex-row lg:items-center justify-between px-5 sm:px-10 py-8 w-full border-b border-gray-200 hover:bg-navy-secondary/10 transition-all hover:border-s-4 hover:border-s-navy-secondary"
                            }
                        >
                            <div
                                className={
                                    "flex w-full min-w-0 flex-col items-start gap-3 sm:flex-row sm:items-center"
                                }
                            >
                                <div
                                    key={s.id}
                                    className="w-24 sm:w-32 shrink-0 flex items-center justify-center overflow-hidden rounded-md border border-gray-200 transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                                >
                                    <img
                                        loading="lazy"
                                        decoding="async"
                                        src={s.logo?.url}
                                        alt={s.name}
                                        className="h-full w-full object-fill"
                                    />
                                </div>

                                <div
                                    className={
                                        "flex min-w-0 flex-col items-start"
                                    }
                                >
                                    <h2 className={"font-extrabold text-navy"}>
                                        {s.name}
                                    </h2>
                                    <div
                                        className={
                                            "flex flex-wrap items-center gap-3"
                                        }
                                    >
                                        {s.product_families?.map((f) => (
                                            <Badge variant={"navy"}>
                                                {translate(f.name)}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    "flex w-full md:w-auto min-w-0 flex-col items-start gap-3 sm:flex-row sm:items-center"
                                }
                            >
                                <Badge
                                    variant={"secondary"}
                                    className={"text-xs font-bold"}
                                >
                                    {s.products_count ?? 0}{" "}
                                    {translateKey("site.copy.products_2")}{" "}
                                </Badge>
                                <Link
                                    href={siteRoute(
                                        "site.products.product.technologies.suppliers.index",
                                        {
                                            productTechnologySlug:
                                                productTechnology.slug,
                                            supplierSlug:          s.slug,
                                        },
                                    )}
                                >
                                    <Button
                                        className={
                                            "text-xs font-extrabold text-navy-secondary"
                                        }
                                        variant={"link"}
                                        size={"sm"}
                                    >
                                        {translateKey("site.copy.browse")}{" "}
                                        <MoveRightIcon />
                                    </Button>
                                </Link>
                            </div>
                        </Link>
                    ))}
                </div>

                <div
                    className={
                        "my-10 w-full flex flex-col items-start gap-5 lg:flex-row lg:items-center justify-between bg-navy-secondary/20 px-5 py-5 rounded-lg border border-navy-secondary/20 border-s-4 border-s-navy-secondary"
                    }
                >
                    <div
                        className={
                            "flex flex-col gap-3 items-start max-w-full lg:max-w-1/2"
                        }
                    >
                        <h2 className={"font-extrabold text-navy-secondary"}>
                            {" "}
                            {translateKey(
                                "site.copy.comparing_options_in",
                            )}{" "}
                            {translate(productTechnology.name)}
                        </h2>
                        <p className={"text-sm text-paragraph"}>
                            {" "}
                            {translateKey(
                                "site.copy.our_engineers_can_put_the_candidates_side_by_side_against_your_requirement_and_budget",
                            )}{" "}
                        </p>
                    </div>
                    <Link href={siteRoute("site.contact")}>
                        <Button variant={"navy-secondary"} size={"hero"}>
                            {" "}
                            {translateKey(
                                "site.copy.talk_it_through_with_us",
                            )}{" "}
                        </Button>
                    </Link>
                </div>

                <MoveLink
                    href={siteRoute("site.products")}
                    dir={"back"}
                    className={"text-navy-secondary font-extrabold"}
                >
                    {" "}
                    {translateKey("site.copy.all_categories")}{" "}
                </MoveLink>
            </div>
        </div>
    );
};

export default BySlug;
