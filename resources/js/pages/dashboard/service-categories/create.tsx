import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import TranslatableInput from "@/components/form/fields/translatable-input";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import FormLocaleProvider from "@/providers/form-locale-provider";
import FormIconPicker from "@/components/form/fields/form-icon-picker";

const Create = () => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?: "PUT" | "POST";
            name:     string;
            title:    string;
            excerpt:  string;
            icon_key: string;
        }>
    >();

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.service.categories.store"));
    };

    return (
        <PageCard
            title={t("dashboard.titles.create", {
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
                            required
                        />
                        <TranslatableInput
                            name="title"
                            label={t("models.ServiceCategory.fields.title")}
                            onChange={(v) => setData("title", v)}
                            required
                        />
                        <FormIconPicker
                            name="icon_key"
                            label={t("models.ServiceCategory.fields.icon_key")}
                            onChange={(value) => setData("icon_key", value)}
                            required
                        />
                        <div className="md:col-span-2">
                            <TranslatableTextarea
                                name="excerpt"
                                label={t(
                                    "models.ServiceCategory.fields.excerpt",
                                )}
                                onChange={(value) => setData("excerpt", value)}
                                required
                            />
                        </div>
                    </div>
                </Form>
            </FormLocaleProvider>
        </PageCard>
    );
};

export default Create;
