import ActionsButtons from "@/components/datatable/actions-buttons";
import Datatable from "@/components/datatable/datatable";
import Http from "@/modules/http/http";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { translate } from "@/models/translatable";
import Inquiry from "@/models/inquiry";

const Index = () => {
    const { t } = useTranslation();
    return (
        <Datatable
            title={t("dashboard.titles.index", {
                model: t("models.Inquiry.singular"),
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
                Http.make<Inquiry[]>().get(
                    route("v1.web.protected.inquiries.data"),
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
                    label:    t("models.Inquiry.fields.first_name"),
                    sortable: true,
                },
                {
                    name:     "last_name",
                    label:    t("models.Inquiry.fields.last_name"),
                    sortable: true,
                },
                {
                    name:     "company",
                    label:    t("models.Inquiry.fields.company"),
                    sortable: true,
                },
                {
                    name:     "country",
                    label:    t("models.Inquiry.fields.country"),
                    sortable: true,
                },
                {
                    name:     "email",
                    label:    t("models.Inquiry.fields.email"),
                    sortable: true,
                },
                {
                    name:     "phone",
                    label:    t("models.Inquiry.fields.phone"),
                    sortable: true,
                },
                {
                    name:     "subject",
                    label:    t("models.Inquiry.fields.subject"),
                    sortable: true,
                },
                {
                    name:         "product.name",
                    label:        t("models.Inquiry.fields.product_id"),
                    translatable: true,
                    render:       (_cell, record) => {
                        return (
                            record?.product_id && (
                                <Link
                                    className="hover:text-primary underline"
                                    href={route(
                                        "v1.web.protected.products.show",
                                        record?.product_id,
                                    )}
                                >
                                    <Button size={"sm"}>
                                        {translate(record?.product?.name)}
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
                            buttons={["show", "delete"]}
                            baseUrl={route("v1.web.protected.inquiries.index")}
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
