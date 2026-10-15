import ActionsButtons from "@/components/datatable/actions-buttons";
import Datatable from "@/components/datatable/datatable";
import Http from "@/modules/http/http";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { translate } from "@/models/translatable";
import { DownloadIcon } from "lucide-react";
import ImagePreview from "@/components/ui/image-preview";
import Product from "@/models/product";
import { useTranslation } from "@/hooks/use-translation";

const Index = () => {
    const { t } = useTranslation();

    return (
        <Datatable
            title={t("models.product.plural")}
            createUrl={route("v1.web.protected.products.create")}
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
                Http.make<Product[]>().get(
                    route("v1.web.protected.products.data"),
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
                    label: t("models.product.fields.name"),
                    translatable: true,
                    sortable: true,
                },
                {
                    name: "price_note",
                    label: t("models.product.fields.price_note"),
                    sortable: true,
                },
                {
                    name: "hero_image",
                    label: t("models.product.fields.hero_image"),
                    render: (cell) => {
                        return (
                            <div className={"size-6 rounded-full"}>
                                <ImagePreview src={cell?.url} />
                            </div>
                        );
                    },
                },
                {
                    name: "specifications_file",
                    label: t("models.product.fields.specifications_file"),
                    render: (cell) => {
                        return cell?.url ? (
                            <a href={cell.url} download>
                                <Button size={"icon"}>
                                    <DownloadIcon />
                                </Button>
                            </a>
                        ) : undefined;
                    },
                },
                {
                    name: "datasheet",
                    label: t("models.product.fields.datasheet"),
                    render: (cell) => {
                        return cell?.url ? (
                            <a href={cell.url} download>
                                <Button size={"icon"}>
                                    <DownloadIcon />
                                </Button>
                            </a>
                        ) : undefined;
                    },
                },
                {
                    name: "manual",
                    label: t("models.product.fields.manual"),
                    render: (cell) => {
                        return cell?.url ? (
                            <a href={cell.url} download>
                                <Button size={"icon"}>
                                    <DownloadIcon />
                                </Button>
                            </a>
                        ) : undefined;
                    },
                },
                {
                    name: "brochure",
                    label: t("models.product.fields.brochure"),
                    render: (cell) => {
                        return cell?.url ? (
                            <a href={cell.url} download>
                                <Button size={"icon"}>
                                    <DownloadIcon />
                                </Button>
                            </a>
                        ) : undefined;
                    },
                },
                {
                    name: "supplier.name",
                    label: t("models.product.fields.supplier"),
                    render: (_cell, record) => {
                        return (
                            record?.supplier?.name && (
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
                    name: "product_family.name",
                    label: t("models.product.fields.product_family"),
                    translatable: true,
                    render: (_cell, record) => {
                        return (
                            record?.product_family?.id && (
                                <Link
                                    className="hover:text-primary underline"
                                    href={route(
                                        "v1.web.protected.product.families.show",
                                        record?.product_family?.id,
                                    )}
                                >
                                    <Button size={"sm"}>
                                        {translate(
                                            record?.product_family?.name,
                                        )}
                                    </Button>
                                </Link>
                            )
                        );
                    },
                },
                {
                    name: "product_technology.name",
                    label: t("models.product.fields.product_technology"),
                    translatable: true,
                    render: (_cell, record) => {
                        return (
                            record?.product_technology?.id && (
                                <Link
                                    className="hover:text-primary underline"
                                    href={route(
                                        "v1.web.protected.product.technologies.show",
                                        record?.product_technology?.id,
                                    )}
                                >
                                    <Button size={"sm"}>
                                        {translate(
                                            record?.product_technology?.name,
                                        )}
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
                            baseUrl={route("v1.web.protected.products.index")}
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
