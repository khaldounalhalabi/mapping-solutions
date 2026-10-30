import ActionsButtons from "@/components/datatable/actions-buttons";
import Datatable from "@/components/datatable/datatable";
import Http from "@/modules/http/http";
import { useTranslation } from "@/hooks/use-translation";
import ProductRange from "@/models/product-range";

const Index = () => {
    const { t } = useTranslation();
    return (
        <Datatable
            title={t("dashboard.titles.index", {
                model: t("models.ProductRange.singular"),
            })}
            createUrl={route("v1.web.protected.product.ranges.create")}
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
                Http.make<ProductRange[]>().get(
                    route("v1.web.protected.product.ranges.data"),
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
                    name:     "label",
                    label:    t("models.ProductRange.fields.label"),
                    sortable: true,
                },
                {
                    name:     "range",
                    label:    t("models.ProductRange.fields.range"),
                    sortable: true,
                },
                {
                    name:     "colour",
                    label:    t("models.ProductRange.fields.colour"),
                    sortable: true,
                },
                {
                    name:     "title",
                    label:    t("models.ProductRange.fields.title"),
                    sortable: true,
                },
                {
                    name:     "sort_order",
                    label:    t("models.ProductRange.fields.sort_order"),
                    sortable: true,
                },
                {
                    label:  t("dashboard.table.options"),
                    render: (_data, record, setHidden) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route(
                                "v1.web.protected.product.ranges.index",
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
