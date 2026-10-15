import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import Http from "@/modules/http/http";
import NewsCategory from "@/models/news-category";
import ApiSelect from "@/components/form/fields/select/api-select";
import { translate } from "@/models/translatable";
import Media from "@/models/media";
import FilepondInput from "@/components/form/fields/filepond/filepond-input";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import TranslatableTextEditor from "@/components/form/fields/translatable-text-editor";

const Create = () => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?:         "PUT" | "POST";
            news_category_id: number;
            title:            string;
            excerpt:          string;
            content:          string;
            hero_image?:      Media | File | null;
        }>
    >();

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.news.articles.store"));
    };

    return (
        <PageCard
            title={t("dashboard.titles.create", {
                model: t("models.NewsArticle.singular"),
            })}
        >
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <TranslatableInput
                            name="title"
                            label={t("models.NewsArticle.fields.title")}
                            onChange={(v) => setData("title", v)}
                            required
                        />
                        <ApiSelect
                            name="news_category_id"
                            label={t(
                                "models.NewsArticle.fields.news_category_id",
                            )}
                            api={(page, search) =>
                                Http.make<NewsCategory[]>().get(
                                    route(
                                        "v1.web.protected.news.categories.data",
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
                                setData("news_category_id", v?.value)
                            }
                            getOptionLabel={(data) => translate(data.name)}
                            optionValue={"id"}
                            required
                        />
                        <div className="md:col-span-2">
                            <FilepondInput
                                name="hero_image"
                                label={t(
                                    "models.NewsArticle.fields.hero_image",
                                )}
                                onChange={(file) => setData("hero_image", file)}
                                acceptedFileTypes={["image/*"]}
                            />
                        </div>
                        <div className={"md:col-span-2"}>
                            <TranslatableTextarea
                                name="excerpt"
                                label={t("models.NewsArticle.fields.excerpt")}
                                onChange={(v) => setData("excerpt", v)}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <TranslatableTextEditor
                                name="content"
                                label={t("models.NewsArticle.fields.content")}
                                onChange={(v) => setData("content", v)}
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
