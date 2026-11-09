import Http from "@/modules/http/http";
import { useTranslation } from "@/hooks/use-translation";
import { useState } from "react";

import { usePage } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Globe2, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { languageSwitchUrl } from "@/lib/language-switch-url";

const languageNames = { en: "English", ar: "العربية", fr: "Français" };

const LanguageDropdown = ({
    className,
    appearance = "default",
}: {
    className?:  string;
    appearance?: "default" | "website";
}) => {
    const {
        props: { currentLocale, availableLocales, seo },
    } = usePage();

    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const handleLocalChange = (locale: string) => {
        if (locale === currentLocale || loading) return;
        setLoading(true);
        Http.make()
            .post(route("set-locale"), { lang: locale })
            .then((response) => {
                if (!response.ok()) {
                    throw new Error("Language change failed");
                }
                window.location.assign(
                    languageSwitchUrl(window.location.href, locale),
                );
            })
            .catch(() => {
                setLoading(false);
                window.alert(t("site.language.error"));
            });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        disabled={loading}
                        aria-label={t("site.language.label")}
                        variant="outline"
                        size={appearance === "website" ? "default" : "icon"}
                        className={cn(
                            appearance === "website"
                                ? "h-10 gap-2 rounded-full border-navy/15 bg-muted/40 px-3 text-navy shadow-none hover:border-navy/30 hover:bg-muted focus-visible:ring-navy/20"
                                : "uppercase",
                            className,
                        )}
                    >
                        {appearance === "website" ? (
                            <>
                                {loading ? (
                                    <Loader
                                        className="size-4 animate-spin"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <Globe2
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                )}
                                <span
                                    className="text-xs font-semibold max-[1100px]:hidden"
                                    lang={currentLocale}
                                >
                                    {languageNames[currentLocale]}
                                </span>
                                <span className="hidden text-xs font-bold uppercase max-[1100px]:inline">
                                    {currentLocale}
                                </span>
                                <ChevronDown
                                    className="size-3 text-muted-foreground"
                                    aria-hidden="true"
                                />
                            </>
                        ) : loading ? (
                            <Loader className="animate-spin" />
                        ) : (
                            currentLocale
                        )}
                    </Button>
                }
            ></DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-56 rounded-xl p-1.5 shadow-lg"
            >
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                    {t("site.language.label")}
                </div>
                {availableLocales.map((l) => (
                    <DropdownMenuItem
                        key={l}
                        disabled={loading}
                        aria-current={l === currentLocale ? "true" : undefined}
                        className={cn(
                            "min-h-11 text-left gap-3 rounded-lg px-3 py-2 text-sm",
                            l === currentLocale && "bg-navy/5 text-navy",
                        )}
                        render={
                            appearance === "website" && seo.alternates[l] ? (
                                <a
                                    href={seo.alternates[l]}
                                    hrefLang={l}
                                    lang={l}
                                />
                            ) : undefined
                        }
                        onClick={
                            appearance === "website" && seo.alternates[l]
                                ? undefined
                                : () => handleLocalChange(l)
                        }
                    >
                        <span
                            className="flex size-7 shrink-0 items-center justify-center rounded-md border border-current/10 bg-muted/50 text-[10px] font-bold uppercase"
                            aria-hidden="true"
                        >
                            {l}
                        </span>
                        <span
                            className="flex-1"
                            lang={l}
                            dir={l === "ar" ? "rtl" : "ltr"}
                        >
                            {languageNames[l]}
                        </span>
                        {l === currentLocale && (
                            <Check
                                className="size-4 text-navy"
                                aria-hidden="true"
                            />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageDropdown;
