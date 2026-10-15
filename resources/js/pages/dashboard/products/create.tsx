import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import Http from "@/modules/http/http";
import ProductTechnology from "@/models/product-technology";
import ApiSelect from "@/components/form/fields/select/api-select";
import { translate } from "@/models/translatable";
import ProductFamily from "@/models/product-family";
import Supplier from "@/models/supplier";
import Media, { DOCUMENT_MIME_TYPES } from "@/models/media";
import FilepondInput from "@/components/form/fields/filepond/filepond-input";
import React from "react";
import Input from "@/components/form/fields/input";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import TranslatableTextEditor from "@/components/form/fields/translatable-text-editor";
import { useTranslation } from "@/hooks/use-translation";

const Create = () => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?:               "PUT" | "POST";
            supplier_id:            number;
            product_family_id?:     number;
            product_technology_id?: number;
            name:                   string;
            price_note?:            string;
            excerpt?:               string;
            overview?:              string;
            key_specs?:             string;
            specifications?:        string;
            applications?:          string;
            external_url?:          string;
            brochure?:              Media | File | null;
            hero_image?:            Media | File | null;
            specifications_file?:   Media | File | null;
            datasheet?:             Media | File | null;
            manual?:                Media | File | null;
        }>
    >();

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("v1.web.protected.products.store"));
    };

    return (
        <PageCard
            title={t("dashboard.titles.create", {
                model: t("models.product.singular"),
            })}
        >
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <TranslatableInput
                            name="name"
                            label={t("models.product.fields.name")}
                            onChange={(v) => setData("name", v)}
                            required
                        />
                        <Input
                            name="price_note"
                            label={t("models.product.fields.price_note")}
                            type={"text"}
                            onChange={(e) =>
                                setData("price_note", e.target?.value)
                            }
                        />

                        <Input
                            name="external_url"
                            label={t("models.product.fields.external_url")}
                            onChange={(e) =>
                                setData("external_url", e.target.value)
                            }
                            type={"url"}
                        />

                        <ApiSelect
                            name="supplier_id"
                            label={t("models.product.fields.supplier")}
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
                            required
                        />
                        <ApiSelect
                            name="product_family_id"
                            label={t("models.product.fields.product_family")}
                            api={(page, search) =>
                                Http.make<ProductFamily[]>().get(
                                    route(
                                        "v1.web.protected.product.families.data",
                                    ),
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
                            onChange={(v) =>
                                setData("product_family_id", v?.value)
                            }
                            getOptionLabel={(data) => translate(data.name)}
                            optionValue={"id"}
                        />
                        <ApiSelect
                            name="product_technology_id"
                            label={t(
                                "models.product.fields.product_technology",
                            )}
                            api={(page, search) =>
                                Http.make<ProductTechnology[]>().get(
                                    route(
                                        "v1.web.protected.product.technologies.data",
                                    ),
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
                            onChange={(v) =>
                                setData("product_technology_id", v?.value)
                            }
                            getOptionLabel={(data) => translate(data.name)}
                            optionValue={"id"}
                        />
                        <div className="md:col-span-2">
                            <TranslatableTextarea
                                name="excerpt"
                                label={t("models.product.fields.excerpt")}
                                onChange={(e) => setData("excerpt", e)}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <TranslatableTextEditor
                                name="overview"
                                label={t("models.product.fields.overview")}
                                onChange={(e) => setData("overview", e)}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <TranslatableTextEditor
                                name="key_specs"
                                label={t("models.product.fields.key_specs")}
                                onChange={(e) => setData("key_specs", e)}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <TranslatableTextEditor
                                name="specifications"
                                label={t(
                                    "models.product.fields.specifications",
                                )}
                                onChange={(e) => setData("specifications", e)}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <TranslatableTextEditor
                                name="applications"
                                label={t("models.product.fields.applications")}
                                onChange={(e) => setData("applications", e)}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <FilepondInput
                                name="hero_image"
                                label={t("models.product.fields.hero_image")}
                                onChange={(file) => setData("hero_image", file)}
                                acceptedFileTypes={["image/*"]}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <FilepondInput
                                name="specifications_file"
                                label={t(
                                    "models.product.fields.specifications_file",
                                )}
                                onChange={(file) =>
                                    setData("specifications_file", file)
                                }
                                acceptedFileTypes={DOCUMENT_MIME_TYPES}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <FilepondInput
                                name="datasheet"
                                label={t("models.product.fields.datasheet")}
                                onChange={(file) => setData("datasheet", file)}
                                acceptedFileTypes={DOCUMENT_MIME_TYPES}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <FilepondInput
                                name="manual"
                                label={t("models.product.fields.manual")}
                                onChange={(file) => setData("manual", file)}
                                acceptedFileTypes={DOCUMENT_MIME_TYPES}
                            />
                        </div>
                        <div className={"md:col-span-2"}>
                            <FilepondInput
                                name="brochure"
                                label={t("models.product.fields.brochure")}
                                onChange={(e) => setData("brochure", e)}
                                acceptedFileTypes={DOCUMENT_MIME_TYPES}
                            />
                        </div>
                    </div>
                </Form>
            </FormLocaleProvider>
        </PageCard>
    );
};

export default Create;
