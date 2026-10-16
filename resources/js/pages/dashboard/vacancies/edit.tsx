import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import DatePicker from "@/components/form/fields/date-picker";
import { format } from "date-fns";
import Input from "@/components/form/fields/input";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import Vacancy from "@/models/vacancy";
import { getEnumValues } from "@/helper";
import VacancyTypeEnum from "@/enums/vacancy-type-enum";
import Select from "@/components/form/fields/select/select";
import TranslatableTextEditor from "@/components/form/fields/translatable-text-editor";

const Edit = ({ vacancy }: { vacancy: Vacancy }) => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?:     "PUT" | "POST";
            title:        string;
            excerpt:      string;
            job_type:     string;
            location?:    string;
            closing_date: string;
            content:      string;
        }>
    >({
        _method:      "PUT",
        title:        vacancy?.title,
        excerpt:      vacancy?.excerpt,
        job_type:     vacancy?.job_type,
        location:     vacancy?.location,
        closing_date: vacancy?.closing_date,
        content:      vacancy?.content,
    });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.vacancies.update", vacancy.id));
    };

    return (
        <PageCard
            title={t("dashboard.titles.edit", {
                model: t("models.Vacancy.singular"),
            })}
        >
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <TranslatableInput
                            name="title"
                            label={t("models.Vacancy.fields.title")}
                            onChange={(v) => setData("title", v)}
                            defaultValue={vacancy.title}
                            required
                        />
                        <Select
                            name="job_type"
                            label={t("models.Vacancy.fields.job_type")}
                            onChange={(e) => setData("job_type", e)}
                            data={getEnumValues(VacancyTypeEnum).map((v) => ({
                                label: t(`enums.${v}`),
                                value: v,
                            }))}
                            selected={vacancy.job_type}
                        />
                        <Input
                            name="location"
                            label={t("models.Vacancy.fields.location")}
                            type={"text"}
                            onChange={(e) =>
                                setData("location", e.target?.value)
                            }
                            defaultValue={vacancy.location}
                        />
                        <DatePicker
                            name="closing_date"
                            label={t("models.Vacancy.fields.closing_date")}
                            onChange={(v) =>
                                v &&
                                setData("closing_date", format(v, "yyyy-MM-dd"))
                            }
                            defaultValue={vacancy.closing_date}
                            required
                        />
                        <div className={"md:col-span-2"}>
                            <TranslatableTextarea
                                name="excerpt"
                                label={t("models.Vacancy.fields.excerpt")}
                                onChange={(v) => setData("excerpt", v)}
                                defaultValue={vacancy.excerpt}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <TranslatableTextEditor
                                name="content"
                                label={t("models.Vacancy.fields.content")}
                                onChange={(v) => setData("content", v)}
                                defaultValue={vacancy.content}
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
