import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import TranslatableInput from "@/components/form/fields/translatable-input";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import FormLocaleProvider from "@/providers/form-locale-provider";
import ServiceCategory from "@/models/service-category";
import FormIconPicker from "@/components/form/fields/form-icon-picker";

const Edit = ({ serviceCategory }: { serviceCategory: ServiceCategory }) => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?: "PUT" | "POST";
            name:     string;
            title:    string;
            excerpt:  string;
            icon_key: string;
        }>
    >({
        _method:  "PUT",
        name:     serviceCategory.name,
        title:    serviceCategory.title,
        excerpt:  serviceCategory.excerpt,
        icon_key: serviceCategory.icon_key,
    });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(
            route(
                "v1.web.protected.service.categories.update",
                serviceCategory.id,
            ),
        );
    };

    return (
        <PageCard
            title={t("dashboard.titles.edit", {
                model: t("models.ServiceCategory.singular"),
            })}
        >
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <TranslatableInput
                            name="name"
                            label={t("models.ServiceCategory.fields.name")}
                            onChange={(v) => setData("name", v)}
                            defaultValue={serviceCategory.name}
                            required
                        />
                        <TranslatableInput
                            name="title"
                            label={t("models.ServiceCategory.fields.title")}
                            onChange={(v) => setData("title", v)}
                            defaultValue={serviceCategory.title}
                            required
                        />
                        <FormIconPicker
                            name="icon_key"
                            label={t("models.ServiceCategory.fields.icon_key")}
                            onChange={(value) => setData("icon_key", value)}
                            defaultValue={serviceCategory.icon_key}
                            required
                        />
                        <div className="md:col-span-2">
                            <TranslatableTextarea
                                name="excerpt"
                                label={t(
                                    "models.ServiceCategory.fields.excerpt",
                                )}
                                onChange={(value) => setData("excerpt", value)}
                                defaultValue={serviceCategory.excerpt}
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
