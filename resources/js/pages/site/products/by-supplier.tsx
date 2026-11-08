import { translateKey } from "@/hooks/use-translation";
import Supplier from "@/models/supplier";
import Product from "@/models/product";
import SpectrumLine from "@/components/ui/spectrum-line";
import CatalogueSearch from "@/components/site/products/catalogue-search";
import ProductsList from "@/components/site/products/products-list";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import MoveLink from "@/components/ui/move-link";

const BySupplier = ({
    supplier,
    products,
}: {
    supplier: Supplier;
    products: Product[];
}) => {
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
                    {supplier.name} {translateKey("site.copy.products_2")}{" "}
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
                    <CatalogueSearch supplier_id={supplier.id} />

                    <p className={"text-paragraph text-xs"}>
                        {" "}
                        {translateKey(
                            "site.copy.try_a_product_name_model_number_or_manufacturer_results_appear_as_you_type",
                        )}{" "}
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
                            {" "}
                            {translateKey(
                                "site.copy.need_a_quote_or_a_specification",
                            )}{" "}
                        </h1>
                        <p className={"text-sm text-paragraph"}>
                            {" "}
                            {translateKey(
                                "site.copy.we_ll_confirm_configuration_accessories_and_lead_time_before_you_commit",
                            )}{" "}
                        </p>
                    </div>
                    <Link href={route("site.contact")}>
                        <Button variant={"navy-secondary"} size={"hero"}>
                            {" "}
                            {translateKey(
                                "site.copy.talk_it_through_with_us",
                            )}{" "}
                        </Button>
                    </Link>
                </div>

                <div className={"flex flex-wrap items-center gap-5"}>
                    <MoveLink
                        href={route("site.suppliers")}
                        dir={"back"}
                        className={"text-paragraph font-extrabold"}
                    >
                        {" "}
                        {translateKey("site.copy.all_suppliers")}{" "}
                    </MoveLink>
                </div>
            </div>
        </div>
    );
};

export default BySupplier;
