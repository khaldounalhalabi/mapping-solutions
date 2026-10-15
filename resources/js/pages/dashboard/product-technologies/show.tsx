import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import Gallery from "@/components/ui/gallery";
import DetailItem from "@/components/ui/detail-item";
import { translate } from "@/models/translatable";
import ProductTechnology from "@/models/product-technology";
import { useTranslation } from "@/hooks/use-translation";

const Show = ({
    productTechnology,
}: {
    productTechnology: ProductTechnology;
}) => {
    const { t } = useTranslation();

    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.product_technology.singular"),
            })}
            actions={
                <Link
                    href={route(
                        "v1.web.protected.product.technologies.edit",
                        productTechnology.id,
                    )}
                >
                    <Button>{t("dashboard.actions.edit")}</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.product_technology.fields.name")}
                        value={translate(productTechnology.name)}
                    />
                    <DetailItem
                        label={t("models.product_technology.fields.slug")}
                        value={productTechnology.slug}
                    />
                    <DetailItem
                        label={t("models.product_technology.fields.icon_key")}
                        value={productTechnology?.icon_key}
                    />
                    <DetailItem
                        label={t("models.product_technology.fields.icon")}
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
