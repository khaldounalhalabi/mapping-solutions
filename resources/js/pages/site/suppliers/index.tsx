import { formatNumber, translateKey } from "@/hooks/use-translation";
import SpectrumLine from "@/components/ui/spectrum-line";
import ApiSelect from "@/components/form/fields/select/api-select";
import Http from "@/modules/http/http";
import SectionKicker from "@/components/ui/section-kicker";
import ProductTechnology from "@/models/product-technology";
import { translate } from "@/models/translatable";
import { Badge } from "@/components/ui/badge";
import { Link } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MoveRightIcon from "@/components/site/icons/move-right-icon";

const Index = ({ technologies }: { technologies: ProductTechnology[] }) => {
    const [selectedTechnologyId, setSelectedTechnologyId] = useState<
        ProductTechnology["id"] | undefined
    >(undefined);
    const filteredTechnologies = technologies.filter(
        (technology) =>
            (technology.suppliers?.length ?? 0) > 0 &&
            (selectedTechnologyId === undefined ||
                technology.id === selectedTechnologyId),
    );

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
                    {" "}
                    {translateKey("site.copy.partnerships_since_2004")}{" "}
                </h2>
                <h1
                    className={
                        "text-4xl text-white font-extrabold starting:translate-y-6 starting:opacity-0 translate-0 opacity-100 transition-all duration-800 ease-out"
                    }
                >
                    {" "}
                    {translateKey(
                        "site.copy.the_manufacturers_we_represent",
                    )}{" "}
                </h1>
                <p
                    className={
                        "text-xs text-white/80 max-w-full lg:max-w-1/2 starting:translate-y-7 starting:opacity-0 translate-0 opacity-100 transition-all duration-900 ease-out"
                    }
                >
                    {" "}
                    {translateKey(
                        "site.copy.we_work_directly_with_9_specialist_instrument_makers_across_hyperspectral_thermal_lidar_an",
                    )}{" "}
                </p>
                <div
                    className={
                        "w-full lg:absolute lg:-bottom-5 lg:w-auto flex flex-col gap-4 items-start"
                    }
                >
                    <div className={"w-full lg:min-w-92 bg-white rounded-md"}>
                        <ApiSelect
                            api={(page, search) =>
                                Http.make<ProductTechnology[]>().get(
                                    route("product.technologies.data", {
                                        page,
                                        search,
                                    }),
                                )
                            }
                            getDataArray={(r) => r.data ?? []}
                            getIsLast={(r) => r.paginate?.is_last_page ?? true}
                            getTotalPages={(r) => r.paginate?.total_pages ?? 0}
                            getOptionLabel={(i) => translate(i.name)}
                            optionValue={"id"}
                            onChange={(option) =>
                                setSelectedTechnologyId(option?.value)
                            }
                            placeHolder={translateKey(
                                "site.extra.all_product_technologies_or_select_one_to_filter",
                            )}
                            styles={{
                                dropDownItemClasses:         "hover:bg-navy",
                                selectedDropDownItemClasses: "bg-navy",
                                selectedItemsBadgeClasses:   "bg-navy",
                            }}
                        />
                    </div>
                </div>
            </section>
            <div
                className={
                    "flex flex-col items-start py-24 px-page-padding gap-10"
                }
            >
                {filteredTechnologies.map((t) => (
                    <div
                        key={t.id}
                        className={"flex gap-8 flex-col items-start w-full"}
                    >
                        <SectionKicker>
                            {formatNumber(t.suppliers?.length ?? 0)}{" "}
                            {translateKey("site.copy.manufacturers_2")}{" "}
                        </SectionKicker>
                        <h2 className={"text-2xl font-extrabold"}>
                            {translate(t.name)}
                        </h2>
                        <div
                            className={
                                "grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
                            }
                        >
                            {t.suppliers?.map((s) => {
                                return (
                                    <div
                                        key={s.id}
                                        className={
                                            "transition-all hover:-translate-y-0.5 hover:shadow-2xl border rounded-lg flex flex-col items-start h-full p-6 gap-4 w-full justify-between relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-0.75 before:bg-(image:--spectrum) before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
                                        }
                                    >
                                        <div
                                            className={
                                                "flex items-center gap-3"
                                            }
                                        >
                                            <div
                                                className={
                                                    "flex items-center justify-center overflow-hidden rounded-md aspect-video w-26 border"
                                                }
                                            >
                                                <img
                                                    src={s.logo?.url}
                                                    className="h-full w-full object-fill"
                                                    alt={`${s.name}-logo`}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    "flex flex-col items-start gap-2"
                                                }
                                            >
                                                <span
                                                    className={"font-extrabold"}
                                                >
                                                    {s.name}
                                                </span>
                                                <Badge
                                                    variant={"secondary"}
                                                    className={"p-3"}
                                                >
                                                    {formatNumber(
                                                        s.products_count ?? 0,
                                                    )}{" "}
                                                    {translateKey(
                                                        "site.copy.products_2",
                                                    )}{" "}
                                                </Badge>
                                            </div>
                                        </div>
                                        <p className={"text-paragraph text-xs"}>
                                            {translate(s.description)}
                                        </p>
                                        <h3
                                            className={
                                                "text-paragraph text-xs font-extrabold uppercase"
                                            }
                                        >
                                            {" "}
                                            {translateKey(
                                                "site.copy.product_ranges",
                                            )}{" "}
                                        </h3>
                                        <div
                                            className={
                                                "flex flex-wrap gap-2 w-full items-center"
                                            }
                                        >
                                            {s.product_families?.map((f) => (
                                                <Badge
                                                    variant={"navy"}
                                                    className={"p-3"}
                                                >
                                                    {translate(f.name)}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div
                                            className={
                                                "w-full justify-self-end flex gap-5 flex-col items-start"
                                            }
                                        >
                                            <Separator />
                                            <div
                                                className={
                                                    "flex items-center gap-3"
                                                }
                                            >
                                                <Link
                                                    href={route(
                                                        "site.suppliers.products",
                                                        s.slug,
                                                    )}
                                                >
                                                    <Button
                                                        variant={"hero"}
                                                        className={"px-6 py-5"}
                                                    >
                                                        {translateKey(
                                                            "site.copy.view_products",
                                                        )}
                                                        <MoveRightIcon />
                                                    </Button>
                                                </Link>
                                                <Link
                                                    href={route("site.contact")}
                                                >
                                                    <Button
                                                        className={
                                                            "text-link font-bold"
                                                        }
                                                        variant={"link"}
                                                    >
                                                        {" "}
                                                        {translateKey(
                                                            "site.copy.request_a_quote",
                                                        )}{" "}
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;
