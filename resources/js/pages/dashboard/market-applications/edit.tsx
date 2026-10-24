import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import MarketApplication from "@/models/market-application";
import FormIconPicker from "@/components/form/fields/form-icon-picker";
import TranslatableTextEditor from "@/components/form/fields/translatable-text-editor";
import Checkbox from "@/components/form/fields/checkbox";

const Edit = ({
    marketApplication,
}: {
    marketApplication: MarketApplication;
}) => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?:    "PUT" | "POST";
            name:        string;
            icon_key:    string;
            summary:     string;
            description: string;
            is_featured: boolean;
        }>
    >({
        _method:     "PUT",
        name:        marketApplication?.name,
        icon_key:    marketApplication?.icon_key,
        summary:     marketApplication?.summary,
        description: marketApplication?.description,
        is_featured: marketApplication?.is_featured,
    });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(
            route(
                "v1.web.protected.market.applications.update",
                marketApplication.id,
            ),
        );
    };

    return (
        <PageCard
            title={t("dashboard.titles.edit", {
                model: t("models.MarketApplication.singular"),
            })}
        >
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <TranslatableInput
                            name="name"
                            label={t("models.MarketApplication.fields.name")}
                            onChange={(v) => setData("name", v)}
                            defaultValue={marketApplication.name}
                            required
                        />
                        <FormIconPicker
                            name="icon_key"
                            label={t(
                                "models.MarketApplication.fields.icon_key",
                            )}
                            onChange={(e) => setData("icon_key", e)}
                            defaultValue={marketApplication.icon_key}
                            required
                        />
                        <Checkbox
                            name="is_featured"
                            label={t(
                                "models.MarketApplication.fields.is_featured",
                            )}
                            checked={marketApplication.is_featured}
                            onChange={(value) =>
                                setData("is_featured", value === true)
                            }
                        />
                        <div className="md:col-span-2">
                            <TranslatableTextarea
                                name="summary"
                                label={t(
                                    "models.MarketApplication.fields.summary",
                                )}
                                onChange={(v) => setData("summary", v)}
                                defaultValue={marketApplication.summary}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <TranslatableTextEditor
                                name="description"
                                label={t(
                                    "models.MarketApplication.fields.description",
                                )}
                                onChange={(v) => setData("description", v)}
                                defaultValue={marketApplication.description}
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
