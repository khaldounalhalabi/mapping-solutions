import { siteRoute } from "@/lib/site-route";
import { translateKey } from "@/hooks/use-translation";
import Product from "@/models/product";
import { groupBy, uniqueBy } from "@/helper";
import MoveLink from "@/components/ui/move-link";
import { Link } from "@inertiajs/react";
import { translate } from "@/models/translatable";
import LinedTitle from "@/components/ui/lined-title";
import ProductFamily from "@/models/product-family";

export default function ProductsList(props: { items: Product[] }) {
    let families = props.items
        .filter((p) => p.product_family)
        .map((p) => p.product_family) as ProductFamily[];
    families = uniqueBy(families, "id");
    return (
        <>
            {Object.entries(groupBy(props.items, "product_family_id")).map(
                ([productFamilyId, products]) => {
                    const family = families.find(
                        (f) => f.id === Number(productFamilyId),
                    );

                    return (
                        <div>
                            <LinedTitle>{translate(family?.name)}</LinedTitle>
                            <div
                                className={
                                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 my-10"
                                }
                            >
                                {products.map((p) => (
                                    <Link
                                        href={siteRoute(
                                            "site.products.show",
                                            p.slug,
                                        )}
                                        className={
                                            "border rounded-md border-gray-200 flex flex-col h-full group transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-navy-secondary/50 hover:border-navy-secondary"
                                        }
                                    >
                                        <div className={"h-3/4 border-b"}>
                                            <img
                                                loading="lazy"
                                                decoding="async"
                                                src={p.hero_image?.url}
                                                alt={translate(p.name)}
                                                className={
                                                    "w-full h-full object-contain"
                                                }
                                            />
                                        </div>
                                        <div
                                            className={
                                                "h-1/4 flex flex-col items-start justify-center py-5 px-3"
                                            }
                                        >
                                            <h2
                                                className={
                                                    "text-navy font-extrabold text-sm"
                                                }
                                            >
                                                {translate(p.name)}
                                            </h2>
                                            <MoveLink
                                                href={siteRoute(
                                                    "site.products.show",
                                                    p.slug,
                                                )}
                                                className={
                                                    "font-extrabold text-navy-secondary"
                                                }
                                            >
                                                {" "}
                                                {translateKey(
                                                    "site.copy.view_product",
                                                )}{" "}
                                            </MoveLink>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                },
            )}
        </>
    );
}
