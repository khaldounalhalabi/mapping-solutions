import NewsArticle from "@/models/news-article";
import SectionKicker from "@/components/ui/section-kicker";
import SectionTitle from "@/components/ui/section-title";
import SectionDescription from "@/components/ui/section-description";
import { Link } from "@inertiajs/react";
import { translate } from "@/models/translatable";
import { format, parseISO } from "date-fns";
import MoveLink from "@/components/ui/move-link";

const NewsSection = ({ news }: { news: NewsArticle[] }) => {
    return (
        <div className={"flex flex-col items-start px-page-padding my-12"}>
            <SectionKicker>news and events</SectionKicker>
            <SectionTitle>Latest updates</SectionTitle>
            <SectionDescription className={"my-5"}>
                Product releases, training workshops and project announcements.
            </SectionDescription>
            {/*TODO: fix this link*/}
            <MoveLink href={"#"}>View all news</MoveLink>
            <div className={"grid grid-cols-2 md:grid-cols-3 gap-5 my-10"}>
                {news.map((n) => (
                    <Link
                        href={"#"}
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
                                {format(
                                    parseISO(n.created_at),
                                    "MMMM yyyy",
                                ).toUpperCase()}
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
                            {/*TODO: fix this link*/}
                            <MoveLink href={"#"}>Read more</MoveLink>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NewsSection;
