import ActionsButtons from "@/components/datatable/actions-buttons";
import Datatable from "@/components/datatable/datatable";
import Http from "@/modules/http/http";
import { useTranslation } from "@/hooks/use-translation";
import Vacancy from "@/models/vacancy";
import VacancyTypeEnum from "@/enums/vacancy-type-enum";

const Index = () => {
    const { t } = useTranslation();
    return (
        <Datatable
            title={t("dashboard.titles.index", {
                model: t("models.Vacancy.singular"),
            })}
            createUrl={route("v1.web.protected.vacancies.create")}
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
                Http.make<Vacancy[]>().get(
                    route("v1.web.protected.vacancies.data"),
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
                    name:         "title",
                    label:        t("models.Vacancy.fields.title"),
                    translatable: true,
                    sortable:     true,
                },
                {
                    name:     "job_type",
                    label:    t("models.Vacancy.fields.job_type"),
                    sortable: true,
                    render:   (data: VacancyTypeEnum) => t(`enums.${data}`),
                },
                {
                    name:     "location",
                    label:    t("models.Vacancy.fields.location"),
                    sortable: true,
                },
                {
                    name:     "closing_date",
                    label:    t("models.Vacancy.fields.closing_date"),
                    sortable: true,
                },
                {
                    label:  t("dashboard.table.options"),
                    render: (_data, record, setHidden) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route("v1.web.protected.vacancies.index")}
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
