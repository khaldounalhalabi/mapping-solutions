import ActionsButtons from "@/components/datatable/actions-buttons";
import Datatable from "@/components/datatable/datatable";
import Http from "@/modules/http/http";
import { useTranslation } from "@/hooks/use-translation";
import ServiceCategory from "@/models/service-category";
import { DynamicIcon } from "lucide-react/dynamic";

const Index = () => {
    const { t } = useTranslation();
    return (
        <Datatable
            title={t("dashboard.titles.index", {
                model: t("models.ServiceCategory.singular"),
            })}
            createUrl={route("v1.web.protected.service.categories.create")}
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
                Http.make<ServiceCategory[]>().get(
                    route("v1.web.protected.service.categories.data"),
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
                    label:        t("models.ServiceCategory.fields.name"),
                    translatable: true,
                    sortable:     true,
                },
                {
                    name:         "title",
                    label:        t("models.ServiceCategory.fields.title"),
                    translatable: true,
                    sortable:     true,
                },
                {
                    name:     "icon_key",
                    label:    t("models.ServiceCategory.fields.icon_key"),
                    sortable: true,
                    render(data) {
                        return <DynamicIcon name={data} />;
                    },
                },
                {
                    label:  t("dashboard.table.options"),
                    render: (_data, record, setHidden) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route(
                                "v1.web.protected.service.categories.index",
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
