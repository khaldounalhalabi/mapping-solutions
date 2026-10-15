import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import Http from "@/modules/http/http";
import Supplier from "@/models/supplier";
import ApiSelect from "@/components/form/fields/select/api-select";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import ProductFamily from "@/models/product-family";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";

const Edit = ({ productFamily }: { productFamily: ProductFamily }) => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?:    "PUT" | "POST";
            supplier_id: number;
            name:        string;
        }>
    >({
        _method:     "PUT",
        name:        productFamily?.name,
        supplier_id: productFamily?.supplier_id,
    });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(
            route("v1.web.protected.product.families.update", productFamily.id),
        );
    };

    return (
        <PageCard
            title={t("dashboard.titles.edit", {
                model: t("models.product_family.singular"),
            })}
        >
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <TranslatableInput
                            name="name"
                            label={t("models.product_family.fields.name")}
                            onChange={(v) => setData("name", v)}
                            defaultValue={productFamily.name}
                            required
                        />
                        <ApiSelect
                            name="supplier_id"
                            label={t("models.product_family.fields.supplier")}
                            api={(page, search) =>
                                Http.make<Supplier[]>().get(
                                    route("v1.web.protected.suppliers.data"),
                                    { page: page, search: search },
                                )
                            }
                            getDataArray={(response) => response?.data ?? []}
                            getIsLast={(data) =>
                                data?.paginate?.is_last_page ?? false
                            }
                            getTotalPages={(data) =>
                                data?.paginate?.total_pages ?? 0
                            }
                            onChange={(v) => setData("supplier_id", v?.value)}
                            optionLabel={"name"}
                            optionValue={"id"}
                            defaultValue={productFamily?.supplier}
                            required
                        />
                    </div>
                </Form>
            </FormLocaleProvider>
        </PageCard>
    );
};

export default Edit;
