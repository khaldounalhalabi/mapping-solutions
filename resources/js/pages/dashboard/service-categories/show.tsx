import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import DetailItem from "@/components/ui/detail-item";
import { translate } from "@/models/translatable";
import ServiceCategory from "@/models/service-category";
import { DynamicIcon } from "lucide-react/dynamic";

const Show = ({ serviceCategory }: { serviceCategory: ServiceCategory }) => {
    const { t } = useTranslation();
    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.ServiceCategory.singular"),
            })}
            actions={
                <Link
                    href={route(
                        "v1.web.protected.service.categories.edit",
                        serviceCategory.id,
                    )}
                >
                    <Button>{t("dashboard.actions.edit")}</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.ServiceCategory.fields.name")}
                        value={translate(serviceCategory.name)}
                    />
                    <DetailItem
                        label={t("models.ServiceCategory.fields.title")}
                        value={translate(serviceCategory.title)}
                    />
                    <DetailItem
                        label={t("models.ServiceCategory.fields.icon_key")}
                        value={<DynamicIcon name={serviceCategory.icon_key} />}
                    />
                </div>
                <DetailItem
                    label={t("models.ServiceCategory.fields.excerpt")}
                    value={translate(serviceCategory.excerpt)}
                    orientation="vertical"
                    className="md:col-span-2"
                />
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
