import ActionsButtons from "@/components/datatable/actions-buttons";
import Datatable from "@/components/datatable/datatable";
import Http from "@/modules/http/http";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { translate } from "@/models/translatable";
import { DownloadIcon } from "lucide-react";
import ImagePreview from "@/components/ui/image-preview";
import Product from "@/models/product";

const Index = () => {
    return (
        <Datatable
            title="Products"
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
                    label: "ID",
                    sortable: true,
                },
                {
                    name: "name",
                    label: "Name",
                    translatable: true,
                    sortable: true,
                },
                { name: "price_note", label: "Price Note", sortable: true },
                {
                    name: "hero_image",
                    label: "Hero Image",
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
                    label: "Specifications File",
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
                    label: "Datasheet",
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
                    label: "Manual",
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
                    label: "Brochure",
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
                    label: "Supplier",
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
                    label: "Product Family",
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
                    label: "Product Technology",
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
                    label: "Options",
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
