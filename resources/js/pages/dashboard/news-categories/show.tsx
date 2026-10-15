import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import DetailItem from "@/components/ui/detail-item";
import { translate } from "@/models/translatable";
import NewsCategory from "@/models/news-category";

const Show = ({ newsCategory }: { newsCategory: NewsCategory }) => {
    const { t } = useTranslation();
    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.NewsCategory.singular"),
            })}
            actions={
                <Link
                    href={route(
                        "v1.web.protected.news.categories.edit",
                        newsCategory.id,
                    )}
                >
                    <Button>{t("dashboard.actions.edit")}</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.NewsCategory.fields.name")}
                        value={translate(newsCategory.name)}
                    />
                </div>
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
