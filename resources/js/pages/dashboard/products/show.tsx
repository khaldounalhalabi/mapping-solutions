import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import DetailItem from "@/components/ui/detail-item";
import { DetailItemValue } from "@/components/ui/detail-item-value";
import { translate } from "@/models/translatable";
import { DownloadIcon, ExternalLink } from "lucide-react";
import Gallery from "@/components/ui/gallery";
import Product from "@/models/product";

const Show = ({ product }: { product: Product }) => {
    return (
        <PageCard
            title="Product Details"
            actions={
                <Link
                    href={route("v1.web.protected.products.edit", product.id)}
                >
                    <Button>Edit</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem label="Name" value={translate(product.name)} />
                    <DetailItem
                        label="Price Note"
                        value={product?.price_note}
                    />
                    <DetailItem
                        label="External Url"
                        value={
                            product?.external_url ? (
                                <a
                                    href={product?.external_url}
                                    target={"_blank"}
                                >
                                    <Button size="icon">
                                        <ExternalLink />
                                    </Button>
                                </a>
                            ) : undefined
                        }
                    />
                    <DetailItem
                        label="Hero Image"
                        value={<Gallery sources={[product?.hero_image?.url]} />}
                        className="md:col-span-2"
                        orientation="vertical"
                    />
                    <DetailItem
                        label="Specifications File"
                        value={
                            product?.specifications_file?.url ? (
                                <a
                                    href={product?.specifications_file?.url}
                                    download
                                >
                                    <Button size="icon">
                                        <DownloadIcon />
                                    </Button>
                                </a>
                            ) : undefined
                        }
                    />
                    <DetailItem
                        label="Datasheet"
                        value={
                            product?.datasheet?.url ? (
                                <a href={product?.datasheet?.url} download>
                                    <Button size="icon">
                                        <DownloadIcon />
                                    </Button>
                                </a>
                            ) : undefined
                        }
                    />
                    <DetailItem
                        label="Manual"
                        value={
                            product?.manual?.url ? (
                                <a href={product?.manual?.url} download>
                                    <Button size="icon">
                                        <DownloadIcon />
                                    </Button>
                                </a>
                            ) : undefined
                        }
                    />
                    <DetailItem
                        label="Brochure"
                        value={
                            product?.brochure?.url ? (
                                <a href={product?.brochure?.url} download>
                                    <Button size="icon">
                                        <DownloadIcon />
                                    </Button>
                                </a>
                            ) : undefined
                        }
                    />
                    <DetailItem
                        label="Supplier"
                        value={
                            <Link
                                href={route(
                                    "v1.web.protected.suppliers.show",
                                    product.supplier_id,
                                )}
                            >
                                <Button>
                                    <DetailItemValue
                                        value={product?.supplier?.name}
                                    />
                                </Button>
                            </Link>
                        }
                    />
                    <DetailItem
                        label="Product Family"
                        value={
                            <Link
                                href={route(
                                    "v1.web.protected.product.families.show",
                                    product.product_family_id,
                                )}
                            >
                                <Button>
                                    <DetailItemValue
                                        value={translate(
                                            product?.product_family?.name,
                                        )}
                                    />
                                </Button>
                            </Link>
                        }
                    />
                    <DetailItem
                        label="Product Technology"
                        value={
                            <Link
                                href={route(
                                    "v1.web.protected.product.technologies.show",
                                    product.product_technology_id,
                                )}
                            >
                                <Button>
                                    <DetailItemValue
                                        value={translate(
                                            product?.product_technology?.name,
                                        )}
                                    />
                                </Button>
                            </Link>
                        }
                    />
                </div>

                <DetailItem
                    label="Excerpt"
                    value={translate(product?.excerpt)}
                    orientation="vertical"
                    className="md:col-span-2"
                />
                <DetailItem
                    label="Overview"
                    value={translate(product?.overview)}
                    orientation="vertical"
                    className="md:col-span-2"
                    html
                />
                <DetailItem
                    label="Key Specs"
                    value={translate(product?.key_specs)}
                    orientation="vertical"
                    className="md:col-span-2"
                    html
                />
                <DetailItem
                    label="Specifications"
                    value={translate(product?.specifications)}
                    orientation="vertical"
                    className="md:col-span-2"
                    html
                />
                <DetailItem
                    label="Applications"
                    value={translate(product?.applications)}
                    orientation="vertical"
                    className="md:col-span-2"
                    html
                />
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
