import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import NewsCategory from "@/models/news-category";

const Edit = ({ newsCategory }: { newsCategory: NewsCategory }) => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?: "PUT" | "POST";
            name:     string;
        }>
    >({ _method: "PUT", name: newsCategory?.name });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("v1.web.protected.news.categories.update", newsCategory.id));
    };

    return (
        <PageCard
            title={t("dashboard.titles.edit", {
                model: t("models.NewsCategory.singular"),
            })}
        >
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <TranslatableInput
                            name="name"
                            label={t("models.NewsCategory.fields.name")}
                            onChange={(v) => setData("name", v)}
                            defaultValue={newsCategory.name}
                            required
                        />
                    </div>
                </Form>
            </FormLocaleProvider>
        </PageCard>
    );
};

export default Edit;
