import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import Service from "@/models/service";
import FormIconPicker from "@/components/form/fields/form-icon-picker";

const Edit = ({ service }: { service: Service }) => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?:   "PUT" | "POST";
            group:      string;
            group_icon: string;
            name:       string;
            summary:    string;
        }>
    >({
        _method:    "PUT",
        group:      service?.group,
        group_icon: service?.group_icon ?? undefined,
        name:       service?.name,
        summary:    service?.summary,
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
                        <TranslatableInput
                            name="group"
                            label={t("models.Service.fields.group")}
                            onChange={(v) => setData("group", v)}
                            defaultValue={service.group}
                            required
                        />
                        <FormIconPicker
                            name="group_icon"
                            label={t("models.Service.fields.group_icon")}
                            onChange={(value) => setData("group_icon", value)}
                            defaultValue={service.group_icon ?? undefined}
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
