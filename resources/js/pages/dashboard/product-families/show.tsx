import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import DetailItem from "@/components/ui/detail-item";
import { translate } from "@/models/translatable";
import ProductFamily from "@/models/product-family";
import { DetailItemValue } from "@/components/ui/detail-item-value";
import { useTranslation } from "@/hooks/use-translation";

const Show = ({ productFamily }: { productFamily: ProductFamily }) => {
    const { t } = useTranslation();

    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.product_family.singular"),
            })}
            actions={
                <Link
                    href={route(
                        "v1.web.protected.product.families.edit",
                        productFamily.id,
                    )}
                >
                    <Button>{t("dashboard.actions.edit")}</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.product_family.fields.name")}
                        value={translate(productFamily.name)}
                    />
                    <DetailItem
                        label={t("models.product_family.fields.supplier")}
                        value={
                            <Link
                                href={route(
                                    "v1.web.protected.suppliers.show",
                                    productFamily.supplier_id,
                                )}
                            >
                                <Button>
                                    <DetailItemValue
                                        value={productFamily?.supplier?.name}
                                    />
                                </Button>
                            </Link>
                        }
                    />
                </div>
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
