import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import Gallery from "@/components/ui/gallery";
import DetailItem from "@/components/ui/detail-item";
import { translate } from "@/models/translatable";
import ProductTechnology from "@/models/product-technology";

const Show = ({
    productTechnology,
}: {
    productTechnology: ProductTechnology;
}) => {
    return (
        <PageCard
            title="ProductTechnology Details"
            actions={
                <Link
                    href={route(
                        "v1.web.protected.product.technologies.edit",
                        productTechnology.id,
                    )}
                >
                    <Button>Edit</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label="Name"
                        value={translate(productTechnology.name)}
                    />
                    <DetailItem label="Slug" value={productTechnology.slug} />
                    <DetailItem
                        label="Icon Key"
                        value={productTechnology?.icon_key}
                    />
                    <DetailItem
                        label="Icon"
                        value={
                            <Gallery sources={[productTechnology?.icon?.url]} />
                        }
                        className="md:col-span-2"
                        orientation="vertical"
                    />
                </div>
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
