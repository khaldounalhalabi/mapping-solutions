import { formatDate, translateKey } from "@/hooks/use-translation";
import NewsArticle from "@/models/news-article";
import SectionKicker from "@/components/ui/section-kicker";
import SectionTitle from "@/components/ui/section-title";
import SectionDescription from "@/components/ui/section-description";
import { Link } from "@inertiajs/react";
import { translate } from "@/models/translatable";
import MoveLink from "@/components/ui/move-link";

const NewsSection = ({ news }: { news: NewsArticle[] }) => {
    return (
        <div className={"flex flex-col items-start px-page-padding my-12"}>
            <SectionKicker>
                {" "}
                {translateKey("site.copy.news_and_events")}{" "}
            </SectionKicker>
            <SectionTitle>
                {" "}
                {translateKey("site.copy.latest_updates")}{" "}
            </SectionTitle>
            <SectionDescription className={"my-5"}>
                {" "}
                {translateKey(
                    "site.copy.product_releases_training_workshops_and_project_announcements",
                )}{" "}
            </SectionDescription>
            <MoveLink href={route("site.news")}>
                {" "}
                {translateKey("site.copy.view_all_news")}{" "}
            </MoveLink>
            <div
                className={
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-10"
                }
            >
                {news.map((n) => (
                    <Link
                        href={route("site.news.show", n.slug)}
                        key={n.id}
                        className={`group h-full flex flex-col gap-3 rounded-md border border-gray-200 transition-all hover:-translate-y-0.5 hover:shadow-2xl`}
                    >
                        <img
                            src={n.hero_image?.url}
                            alt={translate(n.title) + "-hero-image"}
                            className="aspect-video w-full object-cover"
                        />

                        <div
                            className={
                                "flex flex-col items-start px-4 py-8 gap-4"
                            }
                        >
                            <h2 className={"text-success text-xs font-bold"}>
                                {formatDate(n.created_at, {
                                    month: "long",
                                    year:  "numeric",
                                })}
                            </h2>
                            <h1
                                className={
                                    "text-navy font-extrabold line-clamp-2"
                                }
                            >
                                {translate(n.title)}
                            </h1>
                            <p className="text-paragraph text-xs leading-relaxed line-clamp-3">
                                {translate(n.excerpt)}
                            </p>
                            <MoveLink href={route("site.news.show", n.slug)}>
                                {" "}
                                {translateKey("site.copy.read_more")}{" "}
                            </MoveLink>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NewsSection;
