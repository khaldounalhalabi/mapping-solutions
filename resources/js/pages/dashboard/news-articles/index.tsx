import ActionsButtons from "@/components/datatable/actions-buttons";
import Datatable from "@/components/datatable/datatable";
import Http from "@/modules/http/http";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { translate } from "@/models/translatable";
import ImagePreview from "@/components/ui/image-preview";
import NewsArticle from "@/models/news-article";

const Index = () => {
    const { t } = useTranslation();
    return (
        <Datatable
            title={t("dashboard.titles.index", {
                model: t("models.NewsArticle.singular"),
            })}
            createUrl={route("v1.web.protected.news.articles.create")}
            getDataArray={(res) => res.data}
            getTotalPages={(res) => res?.paginate?.total_pages ?? 0}
            getTotalRecords={(res) => res.paginate?.total ?? 0}
            api={(
                page?: number | undefined,
                search?: string | undefined,
                sortCol?: string | undefined,
                sortDir?: string | undefined,
                perPage?: number | undefined,
                params?: object | undefined,
            ) =>
                Http.make<NewsArticle[]>().get(
                    route("v1.web.protected.news.articles.data"),
                    {
                        page:     page,
                        search:   search,
                        sort_col: sortCol,
                        sort_dir: sortDir,
                        limit:    perPage,
                        ...params,
                    },
                )
            }
            schema={[
                {
                    name:     "id",
                    label:    t("dashboard.table.id"),
                    sortable: true,
                },
                {
                    name:         "title",
                    label:        t("models.NewsArticle.fields.title"),
                    translatable: true,
                    sortable:     true,
                },
                {
                    name:   "hero_image",
                    label:  t("models.NewsArticle.fields.hero_image"),
                    render: (cell) => {
                        return (
                            cell?.url && (
                                <div className={"size-4"}>
                                    <ImagePreview src={cell?.url} />
                                </div>
                            )
                        );
                    },
                },
                {
                    name:         "newsCategory.name",
                    label:        t(
                        "models.NewsArticle.fields.news_category_id",
                    ),
                    translatable: true,
                    render:       (_cell, record) => {
                        return (
                            record?.news_category_id && (
                                <Link
                                    className="hover:text-primary underline"
                                    href={route(
                                        "v1.web.protected.news.categories.show",
                                        record?.news_category_id,
                                    )}
                                >
                                    <Button size={"sm"}>
                                        {translate(record?.news_category?.name)}
                                    </Button>
                                </Link>
                            )
                        );
                    },
                },
                {
                    label:  t("dashboard.table.options"),
                    render: (_data, record, setHidden) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route(
                                "v1.web.protected.news.articles.index",
                            )}
                            id={record?.id ?? 0}
                            setHidden={setHidden}
                        />
                    ),
                },
            ]}
        />
    );
};

export default Index;
