import ActionsButtons from "@/components/datatable/actions-buttons";
import Datatable from "@/components/datatable/datatable";
import Http from "@/modules/http/http";
import Supplier from "@/models/supplier";
import ImagePreview from "@/components/ui/image-preview";
import { useTranslation } from "@/hooks/use-translation";

const Index = () => {
    const { t } = useTranslation();

    return (
        <Datatable
            title={t("models.supplier.plural")}
            createUrl={route("v1.web.protected.suppliers.create")}
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
                Http.make<Supplier[]>().get(
                    route("v1.web.protected.suppliers.data"),
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
                    name:     "name",
                    label:    t("models.supplier.fields.name"),
                    sortable: true,
                },
                {
                    name:   "logo",
                    label:  t("models.supplier.fields.logo"),
                    render: (data) => <ImagePreview src={data?.url} />,
                },
                {
                    label:  t("dashboard.table.options"),
                    render: (_data, record, setHidden) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route("v1.web.protected.suppliers.index")}
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
