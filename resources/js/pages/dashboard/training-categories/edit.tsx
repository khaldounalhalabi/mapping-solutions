import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import Input from "@/components/form/fields/input";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import TrainingCategory from "@/models/training-category";

const Edit = ({ trainingCategory }: { trainingCategory: TrainingCategory }) => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?:   "PUT" | "POST";
            name:       string;
            sort_order: number;
            summary:    string;
        }>
    >({
        _method:    "PUT",
        name:       trainingCategory?.name,
        sort_order: trainingCategory?.sort_order,
        summary:    trainingCategory?.summary,
    });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(
            route(
                "v1.web.protected.training.categories.update",
                trainingCategory.id,
            ),
        );
    };

    return (
        <PageCard
            title={t("dashboard.titles.edit", {
                model: t("models.TrainingCategory.singular"),
            })}
        >
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <TranslatableInput
                            name="name"
                            label={t("models.TrainingCategory.fields.name")}
                            onChange={(v) => setData("name", v)}
                            defaultValue={trainingCategory.name}
                            required
                        />
                        <Input
                            name="sort_order"
                            label={t(
                                "models.TrainingCategory.fields.sort_order",
                            )}
                            type={"number"}
                            min={0}
                            onChange={(e) =>
                                setData("sort_order", e.target?.valueAsNumber)
                            }
                            defaultValue={trainingCategory.sort_order}
                            required
                        />
                        <div className="md:col-span-2">
                            <TranslatableTextarea
                                name="summary"
                                label={t(
                                    "models.TrainingCategory.fields.summary",
                                )}
                                onChange={(v) => setData("summary", v)}
                                defaultValue={trainingCategory.summary}
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
