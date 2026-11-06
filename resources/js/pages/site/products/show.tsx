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
                    "flex relative h-full bg-hero px-48 py-10 items-center justify-between w-full"
                }
            >
                <div className={"flex flex-col w-full items-start gap-5"}>
                    <SpectrumLine className={"w-16 h-1"} />
                    <h2
                        className={
                            "text-navy-hero uppercase font-extrabold text-xs starting:translate-y-5 starting:opacity-0 translate-0 opacity-100 transition-all duration-700 ease-out"
                        }
                    >
                        {translate(product.product_technology?.name)}
                    </h2>
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
                            "text-sm text-white/80 max-w-1/2 starting:translate-y-7 starting:opacity-0 translate-0 opacity-100 transition-all duration-900 ease-out"
                        }
                    >
                        {translate(product.excerpt)}
                    </p>
                    <Button variant={"hero"} size={"hero"}>
                        Request a quote
                    </Button>
                    <p
                        className={
                            "text-xs text-white/80 max-w-1/2 starting:translate-y-7 starting:opacity-0 translate-0 opacity-100 transition-all duration-900 ease-out"
                        }
                    >
                        No obligation — we reply within one working day with
                        pricing and availability.
                    </p>
                </div>

                <div
                    className={
                        "bg-white rounded-md shadow-md max-w-1/2 animate-slow-bounce transition-all"
                    }
                >
                    <img
                        src={product.hero_image?.url}
                        alt={product.hero_image?.name}
                    />
                </div>

                <div
                    className={
                        "absolute bg-white -bottom-18 grid grid-cols-3 shadow-xl max-w-[75vw] rounded-lg"
                    }
                >
                    <div
                        className={
                            "flex flex-col gap-2 items-start p-4 border-r"
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
                                Key Specifications
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
                            "flex flex-col gap-2 items-start p-4 border-r"
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
                                Pricing
                            </h2>
                        </div>
                        <p
                            className={
                                "text-navy text-xs font-bold text-wrap text-start"
                            }
                        >
                            {/*TODO: current now this isn't a translatable within the products table (as for dashboard) we need to make it translatable*/}
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
                                Support
                            </h2>
                        </div>
                        <p
                            className={
                                "text-navy text-xs font-bold text-wrap text-start"
                            }
                        >
                            {/*TODO: make this included in the product table*/}
                            UK-based advice, training and after-sales support
                            included with every system.
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
                    "flex flex-col items-start gap-5 px-page-padding py-26"
                }
            >
                <SectionKicker>Product Details</SectionKicker>
                <SectionTitle>Everything about this product</SectionTitle>
                <p className={"text-paragraph text-xs max-w-1/2 text-wrap"}>
                    Move between a plain-English overview, the full technical
                    specifications, downloadable documents, and typical
                    applications.
                </p>

                <Tabs defaultValue={"overview"}>
                    <TabsList className="flex gap-3 h-14 items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-2 py-7">
                        <TabsTrigger
                            className="h-full data-active:shadow-navy-secondary/50 data-active:border-navy-secondary flex-1 py-5 px-4 text-sm font-bold transition-all data-active:bg-navy-secondary data-active:hover:text-white data-active:text-white data-active:shadow-md"
                            value={"overview"}
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-full data-active:shadow-navy-secondary/50 data-active:border-navy-secondary flex-1 py-5 px-4 text-sm font-bold transition-all data-active:bg-navy-secondary data-active:hover:text-white data-active:text-white data-active:shadow-md"
                            value={"specifications"}
                        >
                            Specifications
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-full data-active:shadow-navy-secondary/50 data-active:border-navy-secondary flex-1 py-5 px-4 text-sm font-bold transition-all data-active:bg-navy-secondary data-active:hover:text-white data-active:text-white data-active:shadow-md"
                            value={"downloads"}
                        >
                            Downloads
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-full data-active:shadow-navy-secondary/50 data-active:border-navy-secondary flex-1 py-5 px-4 text-sm font-bold transition-all data-active:bg-navy-secondary data-active:hover:text-white data-active:text-white data-active:shadow-md"
                            value={"applications"}
                        >
                            Applications
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
                                            "max-w-3/4 p-1 border rounded-md"
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
                                        name={"Specification File"}
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
                                "w-full grid grid-cols-2 md:grid-cols-3 my-5"
                            }
                        >
                            {product.datasheet && (
                                <DownloadableCard
                                    name={"Technical Datasheet"}
                                    media={product.datasheet}
                                />
                            )}

                            {product.manual && (
                                <DownloadableCard
                                    name={"Manual"}
                                    media={product.manual}
                                />
                            )}

                            {product.brochure && (
                                <DownloadableCard
                                    name={"Brocure"}
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
                            <h1
                                className={"font-extrabold text-navy-secondary"}
                            >
                                Not sure this is the right instrument?
                            </h1>
                            <p className={"text-sm text-paragraph"}>
                                Tell us what you're surveying, over what area,
                                and to what accuracy. We'll confirm whether this
                                fits — or point you at something that does.{" "}
                                <Link
                                    className={
                                        "text-navy-secondary font-bold hover:underline"
                                    }
                                    href={route("site.contact")}
                                >
                                    Ask our technical team.
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={"flex items-center w-full gap-5"}>
                    <MoveLink
                        href={route(
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
                        Back to {product.supplier?.name}
                    </MoveLink>
                    <MoveLink
                        href={route("site.products.product.technologies.show", {
                            productTechnologySlug:
                                product.product_technology?.slug,
                        })}
                        dir={"back"}
                        className={"text-paragraph font-extrabold"}
                    >
                        {translate(product.product_technology?.name)}
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

export default Show;
