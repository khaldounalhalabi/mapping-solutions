import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import DetailItem from "@/components/ui/detail-item";
import { translate } from "@/models/translatable";
import Service from "@/models/service";

const Show = ({ service }: { service: Service }) => {
    const { t } = useTranslation();
    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.Service.singular"),
            })}
            actions={
                <Link
                    href={route("v1.web.protected.services.edit", service.id)}
                >
                    <Button>{t("dashboard.actions.edit")}</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.Service.fields.service_category_id")}
                        value={translate(service.service_category?.name)}
                    />
                    <DetailItem
                        label={t("models.Service.fields.name")}
                        value={translate(service.name)}
                    />
                </div>

                <DetailItem
                    label={t("models.Service.fields.summary")}
                    value={translate(service.summary)}
                    orientation="vertical"
                    className="md:col-span-2"
                />
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
