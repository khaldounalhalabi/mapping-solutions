import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import FormIconPicker from "@/components/form/fields/form-icon-picker";
import TranslatableTextEditor from "@/components/form/fields/translatable-text-editor";
import Checkbox from "@/components/form/fields/checkbox";
import Input from "@/components/form/fields/input";

const Create = () => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?:    "PUT" | "POST";
            name:        string;
            icon_key:    string;
            theme_color: string;
            summary:     string;
            description: string;
            is_featured: boolean;
            is_visible:  boolean;
            sort_order:  number;
        }>
    >({
        is_featured: false,
        is_visible:  true,
        sort_order:  0,
        theme_color: "#0ea5e9",
    });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.market.applications.store"));
    };

    return (
        <PageCard
            title={t("dashboard.titles.create", {
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
                            required
                        />

                        <FormIconPicker
                            name="icon_key"
                            label={t(
                                "models.MarketApplication.fields.icon_key",
                            )}
                            onChange={(e) => setData("icon_key", e)}
                            required
                        />
                        <Input
                            name="theme_color"
                            label={t(
                                "models.MarketApplication.fields.theme_color",
                            )}
                            type="color"
                            defaultValue="#0ea5e9"
                            onChange={(event) =>
                                setData("theme_color", event.target.value)
                            }
                            className="h-12 cursor-pointer p-1"
                            required
                        />

                        <Input
                            name="sort_order"
                            type="number"
                            min={0}
                            max={100000}
                            label={t(
                                "models.MarketApplication.fields.sort_order",
                            )}
                            defaultValue={0}
                            onChange={(e) =>
                                setData("sort_order", Number(e.target.value))
                            }
                        />

                        <div className={"md:col-span-2"}>
                            <Checkbox
                                name="is_featured"
                                label={t(
                                    "models.MarketApplication.fields.is_featured",
                                )}
                                onChange={(value) =>
                                    setData("is_featured", value === true)
                                }
                            />
                        </div>
                        <div className={"md:col-span-2"}>
                            <Checkbox
                                name="is_visible"
                                label={t(
                                    "models.MarketApplication.fields.is_visible",
                                )}
                                checked={true}
                                onChange={(v) =>
                                    setData("is_visible", v === true)
                                }
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TranslatableTextarea
                                name="summary"
                                label={t(
                                    "models.MarketApplication.fields.summary",
                                )}
                                onChange={(v) => setData("summary", v)}
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
