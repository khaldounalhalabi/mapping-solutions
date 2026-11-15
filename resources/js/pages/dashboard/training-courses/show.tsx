import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import DetailItem from "@/components/ui/detail-item";
import { DetailItemValue } from "@/components/ui/detail-item-value";
import { translate } from "@/models/translatable";
import TrainingCourse from "@/models/training-course";

const Show = ({ trainingCourse }: { trainingCourse: TrainingCourse }) => {
    const { t } = useTranslation();
    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.TrainingCourse.singular"),
            })}
            actions={
                <Link
                    href={route(
                        "v1.web.protected.training.courses.edit",
                        trainingCourse.id,
                    )}
                >
                    <Button>{t("dashboard.actions.edit")}</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.TrainingCourse.fields.name")}
                        value={translate(trainingCourse.name)}
                    />

                    <DetailItem
                        label={t("models.TrainingCourse.fields.duration")}
                        value={translate(trainingCourse.duration)}
                    />
                    <DetailItem
                        label={t("models.TrainingCourse.fields.level")}
                        value={translate(trainingCourse.level)}
                    />
                    <DetailItem
                        label={t("models.TrainingCourse.fields.is_published")}
                        value={
                            trainingCourse.is_published
                                ? t("dashboard.boolean.yes")
                                : t("dashboard.boolean.no")
                        }
                    />
                    <DetailItem
                        label={t("models.TrainingCourse.fields.sort_order")}
                        value={trainingCourse.sort_order}
                    />
                    <DetailItem
                        label={t(
                            "models.TrainingCourse.fields.training_category_id",
                        )}
                        value={
                            <Link
                                href={route(
                                    "v1.web.protected.training.categories.show",
                                    trainingCourse.training_category_id,
                                )}
                            >
                                <Button>
                                    <DetailItemValue
                                        value={translate(
                                            trainingCourse?.training_category
                                                ?.name,
                                        )}
                                    />
                                </Button>
                            </Link>
                        }
                    />
                </div>

                <DetailItem
                    label={t("models.TrainingCourse.fields.outline")}
                    value={translate(trainingCourse.outline)}
                    orientation="vertical"
                    className="md:col-span-2"
                />
                <DetailItem
                    label={t("models.TrainingCourse.fields.summary")}
                    value={translate(trainingCourse.summary)}
                    orientation="vertical"
                    className="md:col-span-2"
                />
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
