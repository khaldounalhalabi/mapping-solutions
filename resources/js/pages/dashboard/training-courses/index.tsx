import ActionsButtons from "@/components/datatable/actions-buttons";
import Datatable from "@/components/datatable/datatable";
import Http from "@/modules/http/http";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { translate } from "@/models/translatable";
import { Badge } from "@/components/ui/badge";
import TrainingCourse from "@/models/training-course";

const Index = () => {
    const { t } = useTranslation();
    return (
        <Datatable
            title={t("dashboard.titles.index", {
                model: t("models.TrainingCourse.singular"),
            })}
            createUrl={route("v1.web.protected.training.courses.create")}
            getDataArray={(res) => res.data}
            getTotalPages={(res) => res?.paginate?.total_pages ?? 0}
            getTotalRecords={(res) => res.paginate?.total ?? 0}
            api={(
                page?: number | undefined,
                search?: string | undefined,
                sortCol?: string | undefined,
                sortDir?: string | undefined,
                perPage?: number | undefined,
                params?: object | undefined,
            ) =>
                Http.make<TrainingCourse[]>().get(
                    route("v1.web.protected.training.courses.data"),
                    {
                        page:     page,
                        search:   search,
                        sort_col: sortCol,
                        sort_dir: sortDir,
                        limit:    perPage,
                        ...params,
                    },
                )
            }
            schema={[
                {
                    name:     "id",
                    label:    t("dashboard.table.id"),
                    sortable: true,
                },
                {
                    name:         "name",
                    label:        t("models.TrainingCourse.fields.name"),
                    translatable: true,
                    sortable:     true,
                },
                {
                    name:         "duration",
                    label:        t("models.TrainingCourse.fields.duration"),
                    translatable: true,
                    sortable:     true,
                },
                {
                    name:         "level",
                    label:        t("models.TrainingCourse.fields.level"),
                    translatable: true,
                    sortable:     true,
                },
                {
                    name:     "is_published",
                    label:    t("models.TrainingCourse.fields.is_published"),
                    sortable: true,
                    render:   (cell) => {
                        return cell ? (
                            <Badge>{t("dashboard.boolean.yes")}</Badge>
                        ) : (
                            <Badge variant="destructive">
                                {t("dashboard.boolean.no")}
                            </Badge>
                        );
                    },
                },
                {
                    name:     "sort_order",
                    label:    t("models.TrainingCourse.fields.sort_order"),
                    sortable: true,
                },
                {
                    name:         "training_category.name",
                    label:        t(
                        "models.TrainingCourse.fields.training_category_id",
                    ),
                    translatable: true,
                    render:       (_cell, record) => {
                        return (
                            record?.training_category_id && (
                                <Link
                                    className="hover:text-primary underline"
                                    href={route(
                                        "v1.web.protected.training.categories.show",
                                        record?.training_category_id,
                                    )}
                                >
                                    <Button size={"sm"}>
                                        {translate(
                                            record?.training_category?.name,
                                        )}
                                    </Button>
                                </Link>
                            )
                        );
                    },
                },
                {
                    label:  t("dashboard.table.options"),
                    render: (_data, record, setHidden) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route(
                                "v1.web.protected.training.courses.index",
                            )}
                            id={record?.id ?? 0}
                            setHidden={setHidden}
                        />
                    ),
                },
            ]}
        />
    );
};

export default Index;
