import { translate } from "@/models/translatable";
import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import DetailItem from "@/components/ui/detail-item";
import ProductRange from "@/models/product-range";

const Show = ({ productRange }: { productRange: ProductRange }) => {
    const { t } = useTranslation();
    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.ProductRange.singular"),
            })}
            actions={
                <Link
                    href={route(
                        "v1.web.protected.product.ranges.edit",
                        productRange.id,
                    )}
                >
                    <Button>{t("dashboard.actions.edit")}</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.ProductRange.fields.label")}
                        value={productRange.label}
                    />
                    <DetailItem
                        label={t("models.ProductRange.fields.range")}
                        value={productRange.range}
                    />
                    <DetailItem
                        label={t("models.ProductRange.fields.colour")}
                        value={productRange.colour}
                    />
                    <DetailItem
                        label={t("models.ProductRange.fields.title")}
                        value={translate(productRange.title)}
                    />
                    <DetailItem
                        label={t("models.ProductRange.fields.sort_order")}
                        value={productRange.sort_order}
                    />
                </div>

                <DetailItem
                    label={t("models.ProductRange.fields.description")}
                    value={translate(productRange.description)}
                    orientation="vertical"
                    className="md:col-span-2"
                />
                <DetailItem
                    label={t("models.ProductRange.fields.uses")}
                    value={translate(productRange.uses)}
                    orientation="vertical"
                    className="md:col-span-2"
                />
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
