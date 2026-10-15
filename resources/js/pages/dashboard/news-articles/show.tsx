import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import DetailItem from "@/components/ui/detail-item";
import { DetailItemValue } from "@/components/ui/detail-item-value";
import { translate } from "@/models/translatable";
import Gallery from "@/components/ui/gallery";
import NewsArticle from "@/models/news-article";

const Show = ({ newsArticle }: { newsArticle: NewsArticle }) => {
    const { t } = useTranslation();
    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.NewsArticle.singular"),
            })}
            actions={
                <Link
                    href={route(
                        "v1.web.protected.news.articles.edit",
                        newsArticle.id,
                    )}
                >
                    <Button>{t("dashboard.actions.edit")}</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.NewsArticle.fields.title")}
                        value={translate(newsArticle.title)}
                    />
                    <DetailItem
                        label={t("models.NewsArticle.fields.news_category_id")}
                        value={
                            <Link
                                href={route(
                                    "v1.web.protected.news.categories.show",
                                    newsArticle.news_category_id,
                                )}
                            >
                                <Button>
                                    <DetailItemValue
                                        value={translate(
                                            newsArticle?.news_category?.name,
                                        )}
                                    />
                                </Button>
                            </Link>
                        }
                    />
                    <DetailItem
                        label={t("models.NewsArticle.fields.hero_image")}
                        value={
                            <Gallery sources={[newsArticle?.hero_image?.url]} />
                        }
                        className="md:col-span-2"
                        orientation="vertical"
                    />

                    <DetailItem
                        label={t("models.NewsArticle.fields.excerpt")}
                        value={translate(newsArticle.excerpt)}
                        className="md:col-span-2"
                        orientation="vertical"
                    />
                    <DetailItem
                        label={t("models.NewsArticle.fields.content")}
                        value={translate(newsArticle.content)}
                        orientation="vertical"
                        className="md:col-span-2"
                        html
                    />
                </div>
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
