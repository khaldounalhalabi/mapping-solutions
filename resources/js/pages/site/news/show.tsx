import { siteRoute } from "@/lib/site-route";
import { formatDate, translateKey } from "@/hooks/use-translation";
import NewsArticle from "@/models/news-article";
import SpectrumLine from "@/components/ui/spectrum-line";
import { translate } from "@/models/translatable";
import PublicRichText from "@/components/site/public-rich-text";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MailIcon } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import MoveLink from "@/components/ui/move-link";

const Show = ({
    article,
    prevArticle,
}: {
    article:      NewsArticle;
    prevArticle?: NewsArticle;
}) => {
    const { seo } = usePage().props;
    return (
        <div>
            <section
                className={
                    "relative flex h-full bg-hero flex-col items-start px-5 sm:px-10 lg:px-16 xl:px-48 py-10 gap-5"
                }
            >
                <SpectrumLine className={"w-16 h-1"} />
                <p
                    className={
                        "text-navy-hero uppercase font-extrabold text-xs starting:translate-y-5 starting:opacity-0 translate-0 opacity-100 transition-all duration-700 ease-out"
                    }
                >
                    {translate(article.news_category?.name)}
                </p>
                <h1
                    className={
                        "text-4xl text-white font-extrabold starting:translate-y-6 starting:opacity-0 translate-0 opacity-100 transition-all duration-800 ease-out"
                    }
                >
                    {translate(article.title)}
                </h1>
                <p
                    className={
                        "text-xs text-white/80 max-w-full lg:max-w-1/2 starting:translate-y-7 starting:opacity-0 translate-0 opacity-100 transition-all duration-900 ease-out"
                    }
                >
                    {formatDate(article.created_at)}
                </p>
            </section>
            <div
                className={
                    "px-page-padding flex flex-col items-center justify-between gap-5 py-10"
                }
            >
                {article.hero_image && (
                    <div className={"max-w-full lg:max-w-2/3  bg-white p-1"}>
                        <img
                            className={"object-contain"}
                            src={article.hero_image?.url}
                            alt={translate(article.title)}
                            decoding="async"
                        />
                    </div>
                )}
                <PublicRichText html={translate(article.content)} />
                <Separator />
                <div className={"flex items-center gap-3"}>
                    <h2 className={"uppercase text-xs font-bold"}>
                        {" "}
                        {translateKey("site.copy.share")}{" "}
                    </h2>
                    <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(seo.canonical ?? "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline">
                            <FaLinkedinIn />
                        </Button>
                    </a>{" "}
                    <a
                        target={"_blank"}
                        href={`https://twitter.com/intent/tweet?text=${translate(article.title)}&url=${encodeURIComponent(seo.canonical ?? "")}`}
                    >
                        <Button variant={"outline"}>
                            <FaXTwitter />
                        </Button>
                    </a>
                    <a
                        target={"_blank"}
                        href={`mailto:?subject=${translate(article.title)}&body=Read this article:\n\t${encodeURIComponent(seo.canonical ?? "")}`}
                    >
                        <Button variant={"outline"}>
                            <MailIcon />
                        </Button>
                    </a>
                </div>

                <div
                    className={
                        "my-10 w-full flex flex-col items-start gap-5 lg:flex-row lg:items-center justify-between bg-navy-secondary/20 px-5 py-5 rounded-lg border border-navy-secondary/20 border-s-4 border-s-navy-secondary"
                    }
                >
                    <div
                        className={
                            "flex flex-col gap-3 items-start max-w-full lg:max-w-1/2"
                        }
                    >
                        <h2 className={"font-extrabold text-navy-secondary"}>
                            {" "}
                            {translateKey(
                                "site.copy.question_about_something_in_this_article",
                            )}{" "}
                        </h2>
                        <p className={"text-sm text-paragraph"}>
                            {" "}
                            {translateKey(
                                "site.copy.our_engineers_can_talk_through_how_it_applies_to_your_measurement_requirement",
                            )}{" "}
                        </p>
                    </div>
                    <Link href={siteRoute("site.contact")}>
                        <Button variant={"navy-secondary"} size={"hero"}>
                            {" "}
                            {translateKey("site.copy.get_in_touch")}{" "}
                        </Button>
                    </Link>
                </div>

                {prevArticle && (
                    <div className={"flex justify-start w-full"}>
                        <a
                            className={
                                "hover:cursor-pointer max-w-full lg:max-w-1/3 flex flex-col items-start gap-3 p-5 border rounded-lg group transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-navy-secondary/50 hover:border-navy-secondary"
                            }
                            href={siteRoute("site.news.show", prevArticle.slug)}
                        >
                            <MoveLink
                                href={siteRoute(
                                    "site.news.show",
                                    prevArticle.slug,
                                )}
                                dir={"back"}
                                className={"text-navy-secondary"}
                            >
                                {" "}
                                {translateKey("site.copy.previous")}{" "}
                            </MoveLink>
                            <h2 className={"text-sm font-bold"}>
                                {translate(prevArticle.title)}
                            </h2>
                        </a>
                    </div>
                )}

                <div className={"flex w-full justify-start"}>
                    <MoveLink
                        href={siteRoute("site.news")}
                        dir={"back"}
                        className={"text-navy-secondary"}
                    >
                        {" "}
                        {translateKey("site.copy.back_to_news")}{" "}
                    </MoveLink>
                </div>
            </div>
        </div>
    );
};

export default Show;
