import { useTranslation } from "@/hooks/use-translation";
import { siteRoute } from "@/lib/site-route";
import { formatDate, translateKey } from "@/hooks/use-translation";
import NewsArticle from "@/models/news-article";
import { translate } from "@/models/translatable";
import { InfiniteScroll, Link, usePage } from "@inertiajs/react";
import { Paginated } from "@/global";

const Index = ({ articles }: { articles: Paginated<NewsArticle> }) => {
    const { t } = useTranslation();
    const { newsPagination } = usePage<{
        newsPagination: { previous: string | null; next: string | null };
    }>().props;
    return (
        <div>
            <section
                className={
                    "relative flex h-full bg-hero flex-col items-start px-5 sm:px-10 lg:px-16 xl:px-48 py-10 gap-5"
                }
            >
                <h1
                    className={
                        "text-4xl text-white font-extrabold starting:translate-y-6 starting:opacity-0 translate-0 opacity-100 transition-all duration-800 ease-out"
                    }
                >
                    {" "}
                    {translateKey("site.copy.our_latest_news")}{" "}
                </h1>
                <p
                    className={
                        "text-xs text-white/80 max-w-full lg:max-w-1/2 starting:translate-y-7 starting:opacity-0 translate-0 opacity-100 transition-all duration-900 ease-out"
                    }
                >
                    {" "}
                    {translateKey(
                        "site.copy.stay_up_to_date_with_our_latest_announcements_exciting_developments_and_stories_discover_w",
                    )}{" "}
                </p>
            </section>
            <InfiniteScroll
                preserveUrl
                className={
                    "py-10 px-page-padding flex flex-col items-start gap-10"
                }
                data={"articles"}
            >
                {articles.data.map((a) => (
                    <Link
                        key={a.id}
                        className={
                            "flex flex-col items-start gap-3 transition-all hover:-translate-y-0.5 hover:shadow-2xl p-3 rounded-md border w-full"
                        }
                        href={siteRoute("site.news.show", a.slug)}
                    >
                        <h2 className={"text-navy text-xl font-extrabold"}>
                            {translate(a.title)}
                        </h2>
                        <p className={"text-paragraph text-sm font-extrabold"}>
                            {formatDate(a.created_at)}
                        </p>

                        <p className={"text-paragraph text-xs font-bold"}>
                            {translate(a.excerpt)}
                        </p>
                    </Link>
                ))}
            </InfiniteScroll>
            <nav
                aria-label={t("seo.pagination")}
                className="flex justify-between gap-4 px-page-padding pb-10"
            >
                {newsPagination.previous && (
                    <Link href={newsPagination.previous} rel="prev">
                        {t("seo.previous")}
                    </Link>
                )}
                {newsPagination.next && (
                    <Link href={newsPagination.next} rel="next">
                        {t("seo.next")}
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default Index;
