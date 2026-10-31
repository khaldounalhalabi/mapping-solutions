import ActionsButtons from "@/components/datatable/actions-buttons";
import Datatable from "@/components/datatable/datatable";
import Http from "@/modules/http/http";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { translate } from "@/models/translatable";
import { Badge } from "@/components/ui/badge";
import JobApplication from "@/models/job-application";

const Index = () => {
    const { t } = useTranslation();
    return (
        <Datatable
            title={t("dashboard.titles.index", {
                model: t("models.JobApplication.singular"),
            })}
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
                Http.make<JobApplication[]>().get(
                    route("v1.web.protected.job.applications.data"),
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
                    name:     "first_name",
                    label:    t("models.JobApplication.fields.first_name"),
                    sortable: true,
                },
                {
                    name:     "last_name",
                    label:    t("models.JobApplication.fields.last_name"),
                    sortable: true,
                },
                {
                    name:     "email",
                    label:    t("models.JobApplication.fields.email"),
                    sortable: true,
                },
                {
                    name:     "phone",
                    label:    t("models.JobApplication.fields.phone"),
                    sortable: true,
                },
                {
                    name:     "referral_source",
                    label:    t("models.JobApplication.fields.referral_source"),
                    sortable: true,
                },
                {
                    name:     "eligible_to_work_in_uk",
                    label:    t(
                        "models.JobApplication.fields.eligible_to_work_in_uk",
                    ),
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
                    name:     "notice_period",
                    label:    t("models.JobApplication.fields.notice_period"),
                    sortable: true,
                },
                {
                    name:     "gdpr_consent",
                    label:    t("models.JobApplication.fields.gdpr_consent"),
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
                    name:         "vacancy.title",
                    label:        t("models.JobApplication.fields.vacancy_id"),
                    translatable: true,
                    render:       (_cell, record) => {
                        return record?.vacancy_id ? (
                            <Link
                                className="hover:text-primary underline"
                                href={route(
                                    "v1.web.protected.vacancies.show",
                                    record?.vacancy_id,
                                )}
                            >
                                <Button size={"sm"}>
                                    {translate(record?.vacancy?.title)}
                                </Button>
                            </Link>
                        ) : (
                            t("publicForms.speculative")
                        );
                    },
                },
                {
                    label:  t("dashboard.table.options"),
                    render: (_data, record, setHidden) => (
                        <ActionsButtons
                            buttons={["delete", "show"]}
                            baseUrl={route(
                                "v1.web.protected.job.applications.index",
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
