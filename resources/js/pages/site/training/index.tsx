import SpectrumLine from "@/components/ui/spectrum-line";
import { useTranslation } from "@/hooks/use-translation";
import TrainingCategory from "@/models/training-category";
import { translate } from "@/models/translatable";
import { Link } from "@inertiajs/react";
import { CSSProperties } from "react";
import {
    ArrowDown,
    ArrowUpRight,
    BookOpen,
    Check,
    Clock3,
    GraduationCap,
    Layers3,
    Map,
    MonitorPlay,
} from "lucide-react";

const themes = [
    {
        Icon:       Layers3,
        color:      "text-sky-700",
        background: "bg-sky-50",
        border:     "border-t-sky-600",
    },
    {
        Icon:       Map,
        color:      "text-teal-700",
        background: "bg-teal-50",
        border:     "border-t-teal-600",
    },
    {
        Icon:       MonitorPlay,
        color:      "text-violet-700",
        background: "bg-violet-50",
        border:     "border-t-violet-600",
    },
];

export default function Training({
    categories,
}: {
    categories: TrainingCategory[];
}) {
    const { t } = useTranslation();
    return (
        <div>
            <section className="relative overflow-hidden bg-hero px-page-padding py-14 text-white sm:py-20">
                <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
                    <div className="flex flex-col items-start gap-6">
                        <SpectrumLine className="h-1 w-16" />
                        <p className="text-xs font-extrabold tracking-widest text-navy-hero uppercase">
                            {t("site.training.eyebrow")}
                        </p>
                        <h1 className="max-w-2xl text-4xl leading-tight font-extrabold sm:text-5xl">
                            {t("site.training.title")}
                        </h1>
                        <p className="max-w-xl text-base leading-relaxed text-white/75">
                            {t("site.training.intro")}
                        </p>
                        <div className="flex flex-wrap gap-3 pt-2">
                            <a
                                href="#training-paths"
                                className="inline-flex min-h-11 items-center gap-3 rounded-md bg-white px-5 py-3 text-sm font-bold text-navy focus-visible:outline-2 focus-visible:outline-offset-4"
                            >
                                {t("site.training.browse")}
                                <ArrowDown className="size-4" />
                            </a>
                            <Link
                                href={route("site.contact")}
                                className="inline-flex min-h-11 items-center gap-3 rounded-md border border-white/30 px-5 py-3 text-sm font-bold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4"
                            >
                                {t("site.training.enquire")}
                                <ArrowUpRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                    <div className="rounded-xl border border-white/15 bg-white/5 p-6 sm:p-8">
                        <GraduationCap
                            className="mb-6 size-9 text-navy-hero"
                            aria-hidden="true"
                        />
                        <p className="mb-5 text-xs font-bold tracking-widest text-white/60 uppercase">
                            {t("site.training.areas")}
                        </p>
                        {categories.length ? (
                            <div className="divide-y divide-white/15">
                                {categories.map((category, index) => {
                                    const { Icon } =
                                        themes[index % themes.length];
                                    return (
                                        <a
                                            key={category.id}
                                            href={`#training-${category.id}`}
                                            className="group flex items-center gap-4 py-4 text-sm font-bold hover:text-navy-hero focus-visible:outline-2 focus-visible:outline-offset-4"
                                        >
                                            <Icon
                                                className="size-5 shrink-0 text-navy-hero"
                                                aria-hidden="true"
                                            />
                                            <span className="flex-1">
                                                {translate(category.name)}
                                            </span>
                                            <ArrowUpRight
                                                className="size-4"
                                                aria-hidden="true"
                                            />
                                        </a>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-sm leading-relaxed text-white/75">
                                {t("site.training.no_categories")}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section
                id="training-paths"
                className="scroll-mt-24 px-page-padding py-14 sm:py-20"
            >
                <div className="mb-8 flex max-w-2xl flex-col gap-3">
                    <p className="text-xs font-bold tracking-widest text-link uppercase">
                        {t("site.training.courses")}
                    </p>
                    <h2 className="text-3xl font-extrabold text-navy">
                        {t("site.training.areas")}
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                        {t("site.training.areas_intro")}
                    </p>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                    {categories.map((category, index) => {
                        const theme = themes[index % themes.length];
                        const groupStart = Math.floor(index / 3) * 3;
                        const rowCount =
                            1 +
                            Math.max(
                                1,
                                ...categories
                                    .slice(groupStart, groupStart + 3)
                                    .map(
                                        (item) =>
                                            item.training_courses?.length ?? 0,
                                    ),
                            );
                        return (
                            <article
                                key={category.id}
                                id={`training-${category.id}`}
                                className={`scroll-mt-24 overflow-hidden rounded-lg border border-t-4 bg-card lg:row-span-(--training-rows) lg:grid lg:grid-rows-subgrid lg:gap-y-0 ${theme.border}`}
                                style={
                                    {
                                        "--training-rows": rowCount,
                                    } as CSSProperties
                                }
                            >
                                <div className="flex flex-col gap-4 p-6">
                                    <div className="flex items-center justify-between">
                                        <div
                                            className={`flex size-12 items-center justify-center rounded-lg ${theme.background} ${theme.color}`}
                                        >
                                            <theme.Icon
                                                className="size-6"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <span className="text-xs font-bold text-muted-foreground">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-extrabold text-navy">
                                        {translate(category.name)}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {translate(category.summary)}
                                    </p>
                                </div>
                                <>
                                    {category.training_courses?.length ? (
                                        category.training_courses.map(
                                            (course) => (
                                                <div
                                                    key={course.id}
                                                    className="flex flex-col justify-between gap-4 border-t p-6"
                                                >
                                                    <h4 className="font-bold text-navy">
                                                        {translate(course.name)}
                                                    </h4>
                                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                                        {translate(
                                                            course.summary,
                                                        )}
                                                    </p>
                                                    <dl className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted-foreground">
                                                        <div>
                                                            <dt className="flex items-center gap-1.5 font-semibold">
                                                                <Clock3
                                                                    className="size-3.5"
                                                                    aria-hidden="true"
                                                                />
                                                                {t(
                                                                    "site.training.duration",
                                                                )}
                                                            </dt>
                                                            <dd className="mt-1">
                                                                {translate(
                                                                    course.duration,
                                                                )}
                                                            </dd>
                                                        </div>
                                                        <div>
                                                            <dt className="flex items-center gap-1.5 font-semibold">
                                                                <BookOpen
                                                                    className="size-3.5"
                                                                    aria-hidden="true"
                                                                />
                                                                {t(
                                                                    "site.training.level",
                                                                )}
                                                            </dt>
                                                            <dd className="mt-1">
                                                                {translate(
                                                                    course.level,
                                                                )}
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                    <details className="rounded-md border bg-muted/30 p-3">
                                                        <summary className="cursor-pointer text-sm font-bold text-navy focus-visible:outline-2 focus-visible:outline-offset-4">
                                                            {t(
                                                                "site.training.outline",
                                                            )}
                                                        </summary>
                                                        <p className="pt-3 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                                                            {translate(
                                                                course.outline,
                                                            )}
                                                        </p>
                                                    </details>
                                                    <Link
                                                        href={route(
                                                            "site.contact",
                                                            {
                                                                training_course:
                                                                    course.id,
                                                            },
                                                        )}
                                                        className={`inline-flex min-h-11 items-center justify-between gap-3 text-sm font-bold ${theme.color} hover:underline focus-visible:outline-2 focus-visible:outline-offset-4`}
                                                    >
                                                        {t(
                                                            "site.training.course_enquiry",
                                                        )}
                                                        <ArrowUpRight
                                                            className="size-4 shrink-0"
                                                            aria-hidden="true"
                                                        />
                                                    </Link>
                                                </div>
                                            ),
                                        )
                                    ) : (
                                        <p className="border-t p-6 text-sm leading-relaxed text-muted-foreground">
                                            {t("site.training.empty")}
                                        </p>
                                    )}
                                </>
                            </article>
                        );
                    })}
                </div>
                <p className="pt-6 text-sm text-muted-foreground">
                    {t("site.training.availability")}
                </p>
            </section>

            <section className="bg-muted/40 px-page-padding py-14">
                <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
                    <div className="flex flex-col items-start gap-5">
                        <SpectrumLine className="h-1 w-12" />
                        <h2 className="text-3xl font-extrabold text-navy">
                            {t("site.training.tailored_title")}
                        </h2>
                        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                            {t("site.training.tailored_body")}
                        </p>
                        <Link
                            href={route("site.contact")}
                            className="inline-flex min-h-11 items-center gap-3 rounded-md bg-navy px-5 py-3 text-sm font-bold text-white hover:bg-navy/90 focus-visible:outline-2 focus-visible:outline-offset-4"
                        >
                            {t("site.training.enquire")}
                            <ArrowUpRight className="size-4" />
                        </Link>
                    </div>
                    <ol className="flex flex-col gap-6">
                        {(
                            [
                                ["step_one", "step_one_body"],
                                ["step_two", "step_two_body"],
                                ["step_three", "step_three_body"],
                            ] as const
                        ).map(([title, body]) => (
                            <li key={title} className="flex gap-4">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-teal-700 shadow-sm">
                                    <Check
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                </span>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-navy">
                                        {t(`site.training.${title}`)}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {t(`site.training.${body}`)}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </div>
    );
}
