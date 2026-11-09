import { siteRoute } from "@/lib/site-route";
import { translateKey } from "@/hooks/use-translation";
import SpectrumLine from "@/components/ui/spectrum-line";
import Product from "@/models/product";
import { translate } from "@/models/translatable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/ui/section-title";
import SectionKicker from "@/components/ui/section-kicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PublicRichText from "@/components/site/public-rich-text";
import DownloadableCard from "@/components/site/products/downloadable-card";
import { isImage } from "@/models/media";
import { Link } from "@inertiajs/react";
import MoveLink from "@/components/ui/move-link";
import { ExternalLink } from "lucide-react";

const Show = ({ product }: { product: Product }) => {
    return (
        <div>
            <section
                className={
                    "flex flex-col gap-8 lg:flex-row lg:gap-0 relative h-full bg-hero px-5 sm:px-10 lg:px-16 xl:px-48 py-10 items-center justify-between w-full"
                }
            >
                <div
                    className={"flex flex-col w-full min-w-0 items-start gap-5"}
                >
                    <SpectrumLine className={"w-16 h-1"} />
                    <p
                        className={
                            "text-navy-hero uppercase font-extrabold text-xs starting:translate-y-5 starting:opacity-0 translate-0 opacity-100 transition-all duration-700 ease-out"
                        }
                    >
                        {translate(product.product_technology?.name)}
                    </p>
                    <h1
                        className={
                            "text-4xl text-white font-extrabold starting:translate-y-6 starting:opacity-0 translate-0 opacity-100 transition-all duration-800 ease-out"
                        }
                    >
                        {translate(product.name)}
                    </h1>
                    <Badge className={"text-navy-hero p-3"} variant={"navy"}>
                        {translate(product.product_family?.name)}
                    </Badge>
                    <p
                        className={
                            "text-sm text-white/80 max-w-full lg:max-w-1/2 starting:translate-y-7 starting:opacity-0 translate-0 opacity-100 transition-all duration-900 ease-out"
                        }
                    >
                        {translate(product.excerpt)}
                    </p>
                    <Button
                        className={"hidden md:block"}
                        variant={"hero"}
                        size={"hero"}
                    >
                        {" "}
                        {translateKey("site.copy.request_a_quote")}{" "}
                    </Button>
                    <p
                        className={
                            "hidden md:block text-xs text-white/80 max-w-full lg:max-w-1/2 starting:translate-y-7 starting:opacity-0 translate-0 opacity-100 transition-all duration-900 ease-out"
                        }
                    >
                        {" "}
                        {translateKey(
                            "site.copy.no_obligation_we_reply_within_one_working_day_with_pricing_and_availability",
                        )}{" "}
                    </p>
                </div>

                <div
                    className={
                        "bg-white rounded-md shadow-md w-full lg:w-auto max-w-full lg:max-w-1/2 animate-slow-bounce transition-all"
                    }
                >
                    <img
                        className="w-full max-h-96 object-contain lg:max-h-none"
                        src={product.hero_image?.url}
                        alt={translate(product.name)}
                        decoding="async"
                        fetchPriority="high"
                    />
                </div>

                <div
                    className={
                        "relative w-full lg:w-auto lg:absolute bg-white lg:-bottom-18 grid grid-cols-1 sm:grid-cols-3 shadow-xl lg:max-w-[75vw] rounded-lg"
                    }
                >
                    <div
                        className={
                            "flex flex-col gap-2 items-start p-4 border-b sm:border-b-0 sm:border-r"
                        }
                    >
                        <div className={"flex items-center gap-2"}>
                            <span
                                className={
                                    "bg-navy-secondary rounded-full size-2"
                                }
                            />
                            <h2
                                className={
                                    "uppercase text-navy-secondary font-extrabold text-xs"
                                }
                            >
                                {" "}
                                {translateKey(
                                    "site.copy.key_specifications",
                                )}{" "}
                            </h2>
                        </div>
                        <p
                            className={
                                "text-navy text-xs font-bold text-wrap text-start"
                            }
                        >
                            {translate(product.key_specs)}
                        </p>
                    </div>

                    <div
                        className={
                            "flex flex-col gap-2 items-start p-4 border-b sm:border-b-0 sm:border-r"
                        }
                    >
                        <div className={"flex items-center gap-2"}>
                            <span
                                className={
                                    "bg-navy-secondary rounded-full size-2"
                                }
                            />
                            <h2
                                className={
                                    "uppercase text-navy-secondary font-extrabold text-xs"
                                }
                            >
                                {" "}
                                {translateKey("site.copy.pricing")}{" "}
                            </h2>
                        </div>
                        <p
                            className={
                                "text-navy text-xs font-bold text-wrap text-start"
                            }
                        >
                            {translate(product.price_note)}
                        </p>
                    </div>

                    <div className={"flex flex-col gap-2 items-start p-4"}>
                        <div className={"flex items-center gap-2"}>
                            <span
                                className={
                                    "bg-navy-secondary rounded-full size-2"
                                }
                            />
                            <h2
                                className={
                                    "uppercase text-navy-secondary font-extrabold text-xs"
                                }
                            >
                                {" "}
                                {translateKey("site.copy.support")}{" "}
                            </h2>
                        </div>
                        <p
                            className={
                                "text-navy text-xs font-bold text-wrap text-start"
                            }
                        >
                            {translate(product.support)}
                        </p>
                    </div>
                </div>

                {product?.external_url ? (
                    <a
                        href={product?.external_url}
                        target={"_blank"}
                        className={"absolute top-5 inset-e-5"}
                    >
                        <Button variant={"hero"} size="icon">
                            <ExternalLink />
                        </Button>
                    </a>
                ) : undefined}
            </section>

            <div
                className={
                    "flex flex-col items-start gap-5 px-page-padding py-12 lg:py-26"
                }
            >
                <SectionKicker>
                    {" "}
                    {translateKey("site.copy.product_details")}{" "}
                </SectionKicker>
                <SectionTitle as="h2">
                    {" "}
                    {translateKey(
                        "site.copy.everything_about_this_product",
                    )}{" "}
                </SectionTitle>
                <p
                    className={
                        "text-paragraph text-xs max-w-full lg:max-w-1/2 text-wrap"
                    }
                >
                    {" "}
                    {translateKey(
                        "site.copy.move_between_a_plain_english_overview_the_full_technical_specifications_downloadable_docum",
                    )}{" "}
                </p>

                <Tabs defaultValue={"overview"} className="w-full min-w-0">
                    <TabsList className="max-w-full overflow-x-auto shrink-0 flex gap-3 h-14 items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-2 py-7">
                        <TabsTrigger
                            className="h-full data-active:shadow-navy-secondary/50 data-active:border-navy-secondary shrink-0 flex-none sm:flex-1 py-5 px-4 text-sm font-bold transition-all data-active:bg-navy-secondary data-active:hover:text-white data-active:text-white data-active:shadow-md"
                            value={"overview"}
                        >
                            {" "}
                            {translateKey("site.copy.overview")}{" "}
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-full data-active:shadow-navy-secondary/50 data-active:border-navy-secondary shrink-0 flex-none sm:flex-1 py-5 px-4 text-sm font-bold transition-all data-active:bg-navy-secondary data-active:hover:text-white data-active:text-white data-active:shadow-md"
                            value={"specifications"}
                        >
                            {" "}
                            {translateKey("site.copy.specifications")}{" "}
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-full data-active:shadow-navy-secondary/50 data-active:border-navy-secondary shrink-0 flex-none sm:flex-1 py-5 px-4 text-sm font-bold transition-all data-active:bg-navy-secondary data-active:hover:text-white data-active:text-white data-active:shadow-md"
                            value={"downloads"}
                        >
                            {" "}
                            {translateKey("site.copy.downloads")}{" "}
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-full data-active:shadow-navy-secondary/50 data-active:border-navy-secondary shrink-0 flex-none sm:flex-1 py-5 px-4 text-sm font-bold transition-all data-active:bg-navy-secondary data-active:hover:text-white data-active:text-white data-active:shadow-md"
                            value={"applications"}
                        >
                            {" "}
                            {translateKey("site.copy.applications_2")}{" "}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value={"overview"}>
                        <div className={"w-full my-5"}>
                            <PublicRichText
                                html={translate(product.overview)}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value={"specifications"}>
                        <div className={"w-full my-5 space-y-2"}>
                            {product.specifications_file &&
                                (isImage(product.specifications_file) ? (
                                    <div
                                        className={
                                            "max-w-full lg:max-w-3/4 p-1 border rounded-md"
                                        }
                                    >
                                        <img
                                            src={
                                                product.specifications_file.url
                                            }
                                            alt={
                                                product.specifications_file.name
                                            }
                                        />
                                    </div>
                                ) : (
                                    <DownloadableCard
                                        name={translateKey(
                                            "site.extra.specification_file",
                                        )}
                                        media={product.specifications_file}
                                    />
                                ))}
                            <PublicRichText
                                html={translate(product.specifications)}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value={"downloads"}>
                        <div
                            className={
                                "w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 my-5"
                            }
                        >
                            {product.datasheet && (
                                <DownloadableCard
                                    name={translateKey(
                                        "site.extra.technical_datasheet",
                                    )}
                                    media={product.datasheet}
                                />
                            )}

                            {product.manual && (
                                <DownloadableCard
                                    name={translateKey("site.extra.manual")}
                                    media={product.manual}
                                />
                            )}

                            {product.brochure && (
                                <DownloadableCard
                                    name={translateKey("site.extra.brocure")}
                                    media={product.brochure}
                                />
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value={"applications"}>
                        <div className={"my-5"}>
                            <PublicRichText
                                html={translate(product.applications)}
                            />
                        </div>
                    </TabsContent>
                </Tabs>

                <div
                    className={
                        "my-10 w-full md:max-w-3/4 flex items-center justify-between bg-navy-secondary/20 px-5 py-5 rounded-lg border border-navy-secondary/20 border-s-4 border-s-navy-secondary"
                    }
                >
                    <div className={"flex items-start gap-5 w-full"}>
                        <div
                            className={
                                "rounded-full bg-navy-secondary/30 size-6 text-center"
                            }
                        >
                            <span className={"text-navy-secondary font-bold"}>
                                ?
                            </span>
                        </div>
                        <div
                            className={
                                "flex flex-col items-start gap-2 max-w-5/6"
                            }
                        >
                            <h2
                                className={"font-extrabold text-navy-secondary"}
                            >
                                {" "}
                                {translateKey(
                                    "site.copy.not_sure_this_is_the_right_instrument",
                                )}{" "}
                            </h2>
                            <p className={"text-sm text-paragraph"}>
                                {" "}
                                {translateKey(
                                    "site.copy.tell_us_what_you_re_surveying_over_what_area_and_to_what_accuracy_we_ll_confirm_whether_th",
                                )}{" "}
                                <Link
                                    className={
                                        "text-navy-secondary font-bold hover:underline"
                                    }
                                    href={siteRoute("site.contact")}
                                >
                                    {" "}
                                    {translateKey(
                                        "site.copy.ask_our_technical_team",
                                    )}{" "}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-wrap items-center w-full gap-5"}>
                    <MoveLink
                        href={siteRoute(
                            "site.products.product.technologies.suppliers.index",
                            {
                                supplierSlug:          product.supplier?.slug,
                                productTechnologySlug:
                                    product.product_technology?.slug,
                            },
                        )}
                        dir={"back"}
                        className={"text-navy-secondary font-extrabold"}
                    >
                        {" "}
                        {translateKey("site.copy.back_to")}{" "}
                        {product.supplier?.name}
                    </MoveLink>
                    <MoveLink
                        href={siteRoute(
                            "site.products.product.technologies.show",
                            {
                                productTechnologySlug:
                                    product.product_technology?.slug,
                            },
                        )}
                        dir={"back"}
                        className={"text-paragraph font-extrabold"}
                    >
                        {translate(product.product_technology?.name)}
                    </MoveLink>
                    <MoveLink
                        href={siteRoute("site.products")}
                        dir={"back"}
                        className={"text-paragraph font-extrabold"}
                    >
                        {" "}
                        {translateKey("site.copy.all_categories")}{" "}
                    </MoveLink>
                </div>
            </div>
        </div>
    );
};

export default Show;
