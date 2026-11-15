import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import DetailItem from "@/components/ui/detail-item";
import { translate } from "@/models/translatable";
import TrainingCategory from "@/models/training-category";

const Show = ({ trainingCategory }: { trainingCategory: TrainingCategory }) => {
    const { t } = useTranslation();
    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.TrainingCategory.singular"),
            })}
            actions={
                <Link
                    href={route(
                        "v1.web.protected.training.categories.edit",
                        trainingCategory.id,
                    )}
                >
                    <Button>{t("dashboard.actions.edit")}</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.TrainingCategory.fields.name")}
                        value={translate(trainingCategory.name)}
                    />
                    <DetailItem
                        label={t("models.TrainingCategory.fields.sort_order")}
                        value={trainingCategory.sort_order}
                    />
                </div>

                <DetailItem
                    label={t("models.TrainingCategory.fields.summary")}
                    value={translate(trainingCategory.summary)}
                    orientation="vertical"
                    className="md:col-span-2"
                />
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
