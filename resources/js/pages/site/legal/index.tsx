import PublicRichText from "@/components/site/public-rich-text";
import SpectrumLine from "@/components/ui/spectrum-line";
import SettingKeyEnum from "@/enums/setting-key-enum";
import useSettings from "@/hooks/use-settings";
import { useTranslation } from "@/hooks/use-translation";
import { translate } from "@/models/translatable";
import { Head, Link } from "@inertiajs/react";
import ArrowUpRightIcon from "@/components/site/icons/arrow-up-right-icon";

export default function LegalPage({
    policy,
}: {
    policy: "privacy_policy" | "terms_and_conditions";
}) {
    const { t } = useTranslation();
    const { valueOf } = useSettings();
    const isPrivacy = policy === "privacy_policy";
    const title = t(`site.legal.${policy}`);
    const content = translate(
        valueOf(
            isPrivacy
                ? SettingKeyEnum.PRIVACY_POLICY
                : SettingKeyEnum.TERMS_AND_CONDITIONS,
        ),
    );

    return (
        <>
            <Head title={title} />
            <header className="bg-hero text-white">
                <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
                    <Link
                        href={route("site.index")}
                        className="text-sm text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                        {t("site.legal.home")} <span aria-hidden="true">/</span>{" "}
                        {t("site.legal.label")}
                    </Link>
                    <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl">
                        {title}
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
                        {t(
                            isPrivacy
                                ? "site.legal.privacy_intro"
                                : "site.legal.terms_intro",
                        )}
                    </p>
                </div>
            </header>
            <SpectrumLine />
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20 lg:px-16 lg:py-20">
                <aside>
                    <nav
                        aria-label={t("site.legal.navigation")}
                        className="flex flex-col gap-2 lg:sticky lg:top-8"
                    >
                        <p className="mb-3 text-xs font-extrabold tracking-widest text-paragraph uppercase">
                            {t("site.legal.label")}
                        </p>
                        {(
                            ["privacy_policy", "terms_and_conditions"] as const
                        ).map((item) => (
                            <Link
                                key={item}
                                href={route(
                                    item === "privacy_policy"
                                        ? "site.privacy.policy"
                                        : "site.terms.and.conditions",
                                )}
                                aria-current={
                                    policy === item ? "page" : undefined
                                }
                                className={`rounded-lg px-4 py-3 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-4 ${policy === item ? "bg-navy text-white" : "text-navy hover:bg-bg-secondary"}`}
                            >
                                {t(`site.legal.${item}`)}
                            </Link>
                        ))}
                    </nav>
                </aside>
                <div className="min-w-0">
                    <article
                        aria-label={title}
                        className="max-w-3xl overflow-x-auto text-paragraph [overflow-wrap:anywhere] whitespace-pre-line"
                    >
                        {content?.trim() ? (
                            <PublicRichText html={content} />
                        ) : (
                            <p className="leading-relaxed">
                                {t("site.legal.empty")}
                            </p>
                        )}
                    </article>
                    <div className="mt-12 flex flex-col items-start gap-5 border-t border-navy/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-extrabold text-navy">
                                {t("site.legal.questions")}
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-paragraph">
                                {t("site.legal.contact_copy")}
                            </p>
                        </div>
                        <Link
                            href={route("site.contact")}
                            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-navy underline underline-offset-4"
                        >
                            {t("site.legal.contact")}{" "}
                            <ArrowUpRightIcon
                                className="size-4"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
