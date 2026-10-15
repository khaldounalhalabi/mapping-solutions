import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";

const Create = () => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?: "PUT" | "POST";
            group: string;
            name: string;
            summary: string;
        }>
    >();

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.services.store"));
    };

    return (
        <PageCard
            title={t("dashboard.titles.create", {
                model: t("models.Service.singular"),
            })}
        >
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <TranslatableInput
                            name="group"
                            label={t("models.Service.fields.group")}
                            onChange={(v) => setData("group", v)}
                            required
                        />
                        <TranslatableInput
                            name="name"
                            label={t("models.Service.fields.name")}
                            onChange={(v) => setData("name", v)}
                            required
                        />
                        <div className="md:col-span-2">
                            <TranslatableTextarea
                                name="summary"
                                label={t("models.Service.fields.summary")}
                                onChange={(v) => setData("summary", v)}
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
