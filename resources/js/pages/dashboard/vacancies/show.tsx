import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import DetailItem from "@/components/ui/detail-item";
import { translate } from "@/models/translatable";
import Vacancy from "@/models/vacancy";

const Show = ({ vacancy }: { vacancy: Vacancy }) => {
    const { t } = useTranslation();
    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.Vacancy.singular"),
            })}
            actions={
                <Link
                    href={route("v1.web.protected.vacancies.edit", vacancy.id)}
                >
                    <Button>{t("dashboard.actions.edit")}</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.Vacancy.fields.title")}
                        value={translate(vacancy.title)}
                    />

                    <DetailItem
                        label={t("models.Vacancy.fields.job_type")}
                        value={t(`enums.${vacancy.job_type}`)}
                    />
                    <DetailItem
                        label={t("models.Vacancy.fields.location")}
                        value={vacancy?.location}
                    />
                    <DetailItem
                        label={t("models.Vacancy.fields.closing_date")}
                        value={vacancy.closing_date}
                    />
                </div>

                <DetailItem
                    label={t("models.Vacancy.fields.excerpt")}
                    value={translate(vacancy.excerpt)}
                    orientation="vertical"
                    className="md:col-span-2"
                />
                <DetailItem
                    label={t("models.Vacancy.fields.content")}
                    value={translate(vacancy.content)}
                    orientation="vertical"
                    className="md:col-span-2"
                    html
                />
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
