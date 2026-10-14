import ActionsButtons from "@/components/datatable/actions-buttons";
import Datatable from "@/components/datatable/datatable";
import Http from "@/modules/http/http";
import ImagePreview from "@/components/ui/image-preview";
import ProductTechnology from "@/models/product-technology";
import { DynamicIcon } from "lucide-react/dynamic";

const Index = () => {
    return (
        <Datatable
            title="Product Technologies"
            createUrl={route("v1.web.protected.product.technologies.create")}
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
                Http.make<ProductTechnology[]>().get(
                    route("v1.web.protected.product.technologies.data"),
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
                    render(data) {
                        return (
                            <span
                                className={
                                    "inline-block max-w-64 overflow-hidden text-ellipsis whitespace-nowrap"
                                }
                            >
                                {data}
                            </span>
                        );
                    },
                },
                {
                    name: "icon",
                    label: "Icon",
                    render(_data, record) {
                        if (record?.icon_key) {
                            return <DynamicIcon name={record.icon_key} />;
                        } else if (record?.icon) {
                            return <ImagePreview src={record?.icon?.url} />;
                        }
                        return undefined;
                    },
                },
                {
                    label: "Options",
                    render: (_data, record, setHidden) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route(
                                "v1.web.protected.product.technologies.index",
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
