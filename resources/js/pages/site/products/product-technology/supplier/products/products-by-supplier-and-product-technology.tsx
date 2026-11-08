import Supplier from "@/models/supplier";
import Product from "@/models/product";
import SpectrumLine from "@/components/ui/spectrum-line";
import { translate } from "@/models/translatable";
import ProductTechnology from "@/models/product-technology";
import { uniqueBy } from "@/helper";
import ProductFamily from "@/models/product-family";
import { Link } from "@inertiajs/react";
import MoveLink from "@/components/ui/move-link";
import { Button } from "@/components/ui/button";
import CatalogueSearch from "@/components/site/products/catalogue-search";
import ProductsList from "@/components/site/products/products-list";

const ProductsBySupplierAndProductTechnology = ({
    supplier,
    productTechnology,
    products,
}: {
    supplier:          Supplier;
    productTechnology: ProductTechnology;
    products:          Product[];
}) => {
    let families = products
        .filter((p) => p.product_family)
        .map((p) => p.product_family) as ProductFamily[];
    families = uniqueBy(families, "id");

    return (
        <div>
            <section
                className={
                    "relative flex h-full bg-hero flex-col items-start px-5 sm:px-10 lg:px-16 xl:px-48 py-10 gap-5"
                }
            >
                <SpectrumLine className={"w-16 h-1"} />
                <h2
                    className={
                        "text-navy-hero uppercase font-extrabold text-xs starting:translate-y-5 starting:opacity-0 translate-0 opacity-100 transition-all duration-700 ease-out"
                    }
                >
                    {translate(productTechnology.name)}
                </h2>
                <div
                    key={supplier.id}
                    className="w-32 flex items-center justify-center overflow-hidden rounded-md starting:opacity-0 translate-0 opacity-100 transition-all duration-800 ease-out"
                >
                    <img
                        src={supplier.logo?.url}
                        alt={supplier.name + "-logo"}
                        className="h-full w-full object-fill"
                    />
                </div>

                <h1
                    className={
                        "text-4xl text-white font-extrabold starting:translate-y-6 starting:opacity-0 translate-0 opacity-100 transition-all duration-800 ease-out"
                    }
                >
                    {supplier.name}
                </h1>
                <div
                    className={
                        "w-full max-w-2xl lg:absolute lg:-bottom-15 flex flex-col gap-4 items-start"
                    }
                >
                    <CatalogueSearch
                        product_technology_id={productTechnology.id}
                        supplier_id={supplier.id}
                    />

                    <p className={"text-paragraph text-xs"}>
                        Try a product name, model number, or manufacturer —
                        results appear as you type.
                    </p>
                </div>
            </section>
            <div className={"py-16 px-page-padding"}>
                <ProductsList items={products} />

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
                        <h1 className={"font-extrabold text-navy-secondary"}>
                            Need a quote or a specification?
                        </h1>
                        <p className={"text-sm text-paragraph"}>
                            We'll confirm configuration, accessories and lead
                            time before you commit.
                        </p>
                    </div>
                    <Link href={route("site.contact")}>
                        <Button variant={"navy-secondary"} size={"hero"}>
                            Talk it through with us
                        </Button>
                    </Link>
                </div>

                <div className={"flex flex-wrap items-center gap-5"}>
                    <MoveLink
                        href={route("site.products.product.technologies.show", {
                            productTechnologySlug: productTechnology.slug,
                        })}
                        dir={"back"}
                        className={"text-navy-secondary font-extrabold"}
                    >
                        Back to {translate(productTechnology.name)}
                    </MoveLink>
                    <MoveLink
                        href={route("site.products")}
                        dir={"back"}
                        className={"text-paragraph font-extrabold"}
                    >
                        All Categories
                    </MoveLink>
                </div>
            </div>
        </div>
    );
};

export default ProductsBySupplierAndProductTechnology;
