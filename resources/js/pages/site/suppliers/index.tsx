import SpectrumLine from "@/components/ui/spectrum-line";
import ApiSelect from "@/components/form/fields/select/api-select";
import Http from "@/modules/http/http";
import Supplier from "@/models/supplier";
import SectionKicker from "@/components/ui/section-kicker";
import ProductTechnology from "@/models/product-technology";
import { translate } from "@/models/translatable";
import { Badge } from "@/components/ui/badge";
import { Link } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MoveRightIcon } from "lucide-react";

const Index = ({ technologies }: { technologies: ProductTechnology[] }) => {
    return (
        <div>
            <section
                className={
                    "relative flex h-full bg-hero flex-col items-start px-48 py-10 gap-5"
                }
            >
                <SpectrumLine className={"w-16 h-1"} />
                <h2
                    className={
                        "text-navy-hero uppercase font-extrabold text-xs starting:translate-y-5 starting:opacity-0 translate-0 opacity-100 transition-all duration-700 ease-out"
                    }
                >
                    Partnerships · since 2004
                </h2>
                <h1
                    className={
                        "text-4xl text-white font-extrabold starting:translate-y-6 starting:opacity-0 translate-0 opacity-100 transition-all duration-800 ease-out"
                    }
                >
                    The manufacturers we represent
                </h1>
                <p
                    className={
                        "text-xs text-white/80 max-w-1/2 starting:translate-y-7 starting:opacity-0 translate-0 opacity-100 transition-all duration-900 ease-out"
                    }
                >
                    We work directly with 9 specialist instrument makers across
                    hyperspectral, thermal, LiDAR and spectroradiometry — which
                    means factory-level technical backing, combined with
                    UK-based advice, training and after-sales support.
                </p>
                <div
                    className={
                        "absolute -bottom-5 flex flex-col gap-4 items-start"
                    }
                >
                    <div className={"min-w-92 bg-white rounded-md"}>
                        {/*TODO: implement this filter*/}
                        <ApiSelect
                            api={(page, search) =>
                                Http.make<Supplier[]>().get(
                                    route("suppliers.data", { page, search }),
                                )
                            }
                            getDataArray={(r) => r.data ?? []}
                            getIsLast={(r) => r.paginate?.is_last_page ?? true}
                            getTotalPages={(r) => r.paginate?.total_pages ?? 0}
                            optionLabel={"name"}
                            optionValue={"id"}
                            placeHolder={
                                "All manufacturers or select one to filter"
                            }
                            styles={{
                                dropDownItemClasses:         "hover:bg-navy",
                                selectedDropDownItemClasses: "bg-navy",
                                selectedItemsBadgeClasses:   "bg-navy",
                            }}
                        />
                    </div>
                </div>
            </section>
            <div className={"flex flex-col items-start py-24 px-page-padding"}>
                {technologies
                    .filter((t) => (t.suppliers?.length ?? 0) > 0)
                    .map((t) => (
                        <div
                            className={"flex gap-8 flex-col items-start w-full"}
                        >
                            <SectionKicker>
                                {t.suppliers?.length} Manufacturers
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
                                                        className={
                                                            "font-extrabold"
                                                        }
                                                    >
                                                        {s.name}
                                                    </span>
                                                    <Badge
                                                        variant={"secondary"}
                                                        className={"p-3"}
                                                    >
                                                        {s.products_count}
                                                        Products
                                                    </Badge>
                                                </div>
                                            </div>
                                            <p
                                                className={
                                                    "text-paragraph text-xs"
                                                }
                                            >
                                                {translate(s.description)}
                                            </p>
                                            <h3
                                                className={
                                                    "text-paragraph text-xs font-extrabold uppercase"
                                                }
                                            >
                                                Product Ranges
                                            </h3>
                                            <div
                                                className={
                                                    "flex flex-wrap gap-2 w-full items-center"
                                                }
                                            >
                                                {s.product_families?.map(
                                                    (f) => (
                                                        // TODO: fix this link
                                                        <Link href={"#"}>
                                                            <Badge
                                                                variant={"navy"}
                                                                className={
                                                                    "p-3"
                                                                }
                                                            >
                                                                {translate(
                                                                    f.name,
                                                                )}
                                                            </Badge>
                                                        </Link>
                                                    ),
                                                )}
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
                                                    {/*TODO: Fix this link*/}
                                                    <Link href={"#"}>
                                                        <Button
                                                            variant={"hero"}
                                                            className={
                                                                "px-6 py-5"
                                                            }
                                                        >
                                                            View Products
                                                            <MoveRightIcon />
                                                        </Button>
                                                    </Link>
                                                    {/*TODO: Fix this link*/}
                                                    <Link href={"#"}>
                                                        <Button
                                                            className={
                                                                "text-link font-bold"
                                                            }
                                                            variant={"link"}
                                                        >
                                                            Request a quote
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
