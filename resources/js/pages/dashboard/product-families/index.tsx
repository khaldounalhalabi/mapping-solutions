import ActionsButtons from "@/components/datatable/actions-buttons";
import Datatable from "@/components/datatable/datatable";
import Http from "@/modules/http/http";
import { Link } from "@inertiajs/react";
import ProductFamily from "@/models/product-family";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";

const Index = () => {
    const { t } = useTranslation();

    return (
        <Datatable
            title={t("models.product_family.plural")}
            createUrl={route("v1.web.protected.product.families.create")}
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
                Http.make<ProductFamily[]>().get(
                    route("v1.web.protected.product.families.data"),
                    {
                        page: page,
                        search: search,
                        sort_col: sortCol,
                        sort_dir: sortDir,
                        limit: perPage,
                        ...params,
                    },
                )
            }
            schema={[
                {
                    name: "id",
                    label: t("dashboard.table.id"),
                    sortable: true,
                },
                {
                    name: "name",
                    label: t("models.product_family.fields.name"),
                    translatable: true,
                    sortable: true,
                },
                {
                    name: "supplier.name",
                    label: t("models.product_family.fields.supplier_name"),
                    render: (_cell, record) => {
                        return (
                            record?.supplier_id && (
                                <Link
                                    className="hover:text-primary underline"
                                    href={route(
                                        "v1.web.protected.suppliers.show",
                                        record?.supplier_id,
                                    )}
                                >
                                    <Button size={"sm"}>
                                        {record?.supplier?.name}
                                    </Button>
                                </Link>
                            )
                        );
                    },
                },
                {
                    label: t("dashboard.table.options"),
                    render: (_data, record, setHidden) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route(
                                "v1.web.protected.product.families.index",
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
