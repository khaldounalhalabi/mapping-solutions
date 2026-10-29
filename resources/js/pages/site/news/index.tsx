import NewsArticle from "@/models/news-article";
import { translate } from "@/models/translatable";
import { Link } from "@inertiajs/react";

const Index = ({ articles }: { articles: NewsArticle[] }) => {
    return (
        <div>
            <section
                className={
                    "relative flex h-full bg-hero flex-col items-start px-48 py-10 gap-5"
                }
            >
                <h1
                    className={
                        "text-4xl text-white font-extrabold starting:translate-y-6 starting:opacity-0 translate-0 opacity-100 transition-all duration-800 ease-out"
                    }
                >
                    Our latest news
                </h1>
                <p
                    className={
                        "text-xs text-white/80 max-w-1/2 starting:translate-y-7 starting:opacity-0 translate-0 opacity-100 transition-all duration-900 ease-out"
                    }
                >
                    Stay up to date with our latest announcements, exciting
                    developments, and stories. Discover what's new, explore our
                    progress, and see what we've been working on.
                </p>
            </section>
            <div
                className={
                    "py-10 px-page-padding flex flex-col items-start gap-10"
                }
            >
                {articles.map((a) => (
                    // TODO: adjust this link
                    <Link
                        className={
                            "flex flex-col items-start gap-3 transition-all hover:-translate-y-0.5 hover:shadow-2xl p-3 rounded-md border w-full"
                        }
                    >
                        <h1 className={"text-navy text-xl font-extrabold"}>
                            {translate(a.title)}
                        </h1>
                        <p className={"text-paragraph text-sm font-extrabold"}>
                            {a.created_at}
                        </p>

                        <p className={"text-paragraph text-xs font-bold"}>
                            {translate(a.excerpt)}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Index;
