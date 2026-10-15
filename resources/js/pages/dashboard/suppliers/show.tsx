import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import Gallery from "@/components/ui/gallery";
import DetailItem from "@/components/ui/detail-item";
import { translate } from "@/models/translatable";
import Supplier from "@/models/supplier";
import { useTranslation } from "@/hooks/use-translation";

const Show = ({ supplier }: { supplier: Supplier }) => {
    const { t } = useTranslation();

    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.supplier.singular"),
            })}
            actions={
                <Link
                    href={route("v1.web.protected.suppliers.edit", supplier.id)}
                >
                    <Button>{t("dashboard.actions.edit")}</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.supplier.fields.name")}
                        value={supplier.name}
                    />
                    <DetailItem
                        label={t("models.supplier.fields.logo")}
                        value={<Gallery sources={[supplier?.logo?.url]} />}
                        className="md:col-span-2"
                        orientation="vertical"
                    />
                </div>

                <DetailItem
                    label={t("models.supplier.fields.description")}
                    value={translate(supplier.description)}
                    orientation="vertical"
                    className="md:col-span-2"
                />
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
