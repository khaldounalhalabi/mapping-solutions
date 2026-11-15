import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import Http from "@/modules/http/http";
import TrainingCategory from "@/models/training-category";
import ApiSelect from "@/components/form/fields/select/api-select";
import { translate } from "@/models/translatable";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import Input from "@/components/form/fields/input";
import Radio from "@/components/form/fields/radio";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";

const Create = () => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?:             "PUT" | "POST";
            training_category_id: number;
            name:                 string;
            outline:              string;
            duration:             string;
            level:                string;
            is_published:         boolean;
            sort_order:           number;
            summary:              string;
        }>
    >({ is_published: false, sort_order: 0 });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.training.courses.store"));
    };

    return (
        <PageCard
            title={t("dashboard.titles.create", {
                model: t("models.TrainingCourse.singular"),
            })}
        >
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <TranslatableInput
                            name="name"
                            label={t("models.TrainingCourse.fields.name")}
                            onChange={(v) => setData("name", v)}
                            required
                        />

                        <TranslatableInput
                            name="duration"
                            label={t("models.TrainingCourse.fields.duration")}
                            onChange={(v) => setData("duration", v)}
                            required
                        />
                        <TranslatableInput
                            name="level"
                            label={t("models.TrainingCourse.fields.level")}
                            onChange={(v) => setData("level", v)}
                            required
                        />
                        <Radio
                            name="is_published"
                            label={t(
                                "models.TrainingCourse.fields.is_published",
                            )}
                            items={[
                                { label: t("dashboard.boolean.yes"), value: 1 },
                                { label: t("dashboard.boolean.no"), value: 0 },
                            ]}
                            onChange={(v) => setData("is_published", v == 1)}
                            checked={(v) => v == 0}
                        />
                        <Input
                            name="sort_order"
                            label={t("models.TrainingCourse.fields.sort_order")}
                            type={"number"}
                            min={0}
                            defaultValue={0}
                            onChange={(e) =>
                                setData("sort_order", e.target?.valueAsNumber)
                            }
                            required
                        />
                        <ApiSelect
                            name="training_category_id"
                            label={t(
                                "models.TrainingCourse.fields.training_category_id",
                            )}
                            api={(page, search) =>
                                Http.make<TrainingCategory[]>().get(
                                    route(
                                        "v1.web.protected.training.categories.data",
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
                                setData("training_category_id", v?.value)
                            }
                            getOptionLabel={(data) => translate(data.name)}
                            optionValue={"id"}
                            required
                        />
                        <div className={"md:col-span-2"}>
                            <TranslatableTextarea
                                name="outline"
                                label={t(
                                    "models.TrainingCourse.fields.outline",
                                )}
                                onChange={(v) => setData("outline", v)}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <TranslatableTextarea
                                name="summary"
                                label={t(
                                    "models.TrainingCourse.fields.summary",
                                )}
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
