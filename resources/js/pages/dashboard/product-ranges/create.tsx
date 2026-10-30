import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import Input from "@/components/form/fields/input";
import UsesField from "./uses-field";

const Create = () => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?:    "PUT" | "POST";
            label:       string;
            range:       string;
            colour:      string;
            title:       string;
            sort_order:  number;
            description: string;
            uses:        string;
        }>
    >({ colour: "#1a9ed4", uses: "{}" });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.product.ranges.store"));
    };

    return (
        <PageCard
            title={t("dashboard.titles.create", {
                model: t("models.ProductRange.singular"),
            })}
        >
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <Input
                            name="label"
                            label={t("models.ProductRange.fields.label")}
                            type={"text"}
                            onChange={(e) => setData("label", e.target?.value)}
                            required
                        />
                        <Input
                            name="range"
                            label={t("models.ProductRange.fields.range")}
                            type={"text"}
                            onChange={(e) => setData("range", e.target?.value)}
                            required
                        />
                        <Input
                            name="colour"
                            label={t("models.ProductRange.fields.colour")}
                            type="color"
                            id="colour_id"
                            defaultValue="#1a9ed4"
                            className="h-10 cursor-pointer p-1"
                            onChange={(e) => setData("colour", e.target?.value)}
                            required
                        />
                        <TranslatableInput
                            name="title"
                            label={t("models.ProductRange.fields.title")}
                            type={"text"}
                            onChange={(value) => setData("title", value)}
                            required
                        />
                        <Input
                            name="sort_order"
                            label={t("models.ProductRange.fields.sort_order")}
                            type={"number"}
                            onChange={(e) =>
                                setData("sort_order", e.target?.valueAsNumber)
                            }
                            required
                        />
                        <div className="md:col-span-2">
                            <TranslatableTextarea
                                name="description"
                                label={t(
                                    "models.ProductRange.fields.description",
                                )}
                                onChange={(value) =>
                                    setData("description", value)
                                }
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <UsesField
                                onChange={(value) => setData("uses", value)}
                            />
                        </div>
                    </div>
                </Form>
            </FormLocaleProvider>
        </PageCard>
    );
};

export default Create;
