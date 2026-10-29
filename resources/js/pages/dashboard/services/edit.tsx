import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import Service from "@/models/service";
import ApiSelect from "@/components/form/fields/select/api-select";
import Http from "@/modules/http/http";
import ServiceCategory from "@/models/service-category";
import { translate } from "@/models/translatable";

const Edit = ({ service }: { service: Service }) => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?:            "PUT" | "POST";
            service_category_id: number;
            name:                string;
            summary:             string;
        }>
    >({
        _method:             "PUT",
        service_category_id: service.service_category_id,
        name:                service.name,
        summary:             service.summary,
    });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.services.update", service.id));
    };

    return (
        <PageCard
            title={t("dashboard.titles.edit", {
                model: t("models.Service.singular"),
            })}
        >
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <ApiSelect
                            name="service_category_id"
                            label={t(
                                "models.Service.fields.service_category_id",
                            )}
                            api={(page, search) =>
                                Http.make<ServiceCategory[]>().get(
                                    route(
                                        "v1.web.protected.service.categories.data",
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
                            onChange={(value) =>
                                setData("service_category_id", value?.value)
                            }
                            getOptionLabel={(category) =>
                                translate(category.name)
                            }
                            optionValue="id"
                            defaultValue={service.service_category}
                            required
                        />
                        <TranslatableInput
                            name="name"
                            label={t("models.Service.fields.name")}
                            onChange={(v) => setData("name", v)}
                            defaultValue={service.name}
                            required
                        />
                        <div className="md:col-span-2">
                            <TranslatableTextarea
                                name="summary"
                                label={t("models.Service.fields.summary")}
                                onChange={(v) => setData("summary", v)}
                                defaultValue={service.summary}
                                required
                            />
                        </div>
                    </div>
                </Form>
            </FormLocaleProvider>
        </PageCard>
    );
};

export default Edit;
