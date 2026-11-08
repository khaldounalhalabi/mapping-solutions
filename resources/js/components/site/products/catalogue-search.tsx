import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/use-translation";
import { Link, router } from "@inertiajs/react";
import { SearchIcon } from "lucide-react";

import useCatalogueSearch from "@/hooks/use-catalogue-search";

const emptyResults = { products: [], suppliers: [] };
export default function CatalogueSearch({
    product_technology_id,
    supplier_id,
    compact = false,
    onResultSelect,
}: {
    product_technology_id?: number;
    supplier_id?:           number;
    compact?:               boolean;
    onResultSelect?:        () => void;
}) {
    const { t } = useTranslation();
    const {
        id,
        container,
        requestVersion,
        value,
        setValue,
        setResults,
        setOpen,
        active,
        setActive,
        status,
        setStatus,
        setRetry,
        visible,
        options,
    } = useCatalogueSearch({ product_technology_id, supplier_id });

    return (
        <div
            ref={container}
            className={
                compact
                    ? "relative w-full min-w-0 min-[1101px]:w-64"
                    : "relative w-full max-w-2xl min-w-0"
            }
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node))
                    setOpen(false);
            }}
        >
            <SearchIcon
                aria-hidden="true"
                className="absolute top-3.5 inset-s-2 size-4.5 text-navy-secondary stroke-3"
            />
            <Input
                role="combobox"
                aria-label={t("site.catalogue.search_placeholder")}
                aria-autocomplete="list"
                aria-expanded={visible}
                aria-controls={visible ? `${id}-results` : undefined}
                aria-activedescendant={
                    visible && active >= 0
                        ? `${id}-option-${active}`
                        : undefined
                }
                autoComplete="off"
                maxLength={200}
                value={value}
                onFocus={() => setOpen(true)}
                onChange={(event) => {
                    requestVersion.current++;
                    setValue(event.target.value);
                    setResults(emptyResults);
                    setActive(-1);
                    setStatus(
                        event.target.value.trim().length >= 2
                            ? "loading"
                            : "idle",
                    );
                    setOpen(true);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Escape") {
                        setOpen(false);
                        setActive(-1);
                    } else if (
                        event.key === "ArrowDown" ||
                        event.key === "ArrowUp"
                    ) {
                        event.preventDefault();
                        setOpen(true);
                        if (options.length)
                            setActive((current) =>
                                event.key === "ArrowDown"
                                    ? (current + 1) % options.length
                                    : current <= 0
                                      ? options.length - 1
                                      : current - 1,
                            );
                    } else if (
                        event.key === "Enter" &&
                        visible &&
                        options.length
                    ) {
                        event.preventDefault();
                        setOpen(false);
                        onResultSelect?.();
                        router.visit(options[Math.max(active, 0)].href);
                    }
                }}
                className={
                    compact
                        ? "bg-white w-full h-10 rounded-sm ps-8 pe-10"
                        : "bg-white w-full py-6 shadow-xl px-10"
                }
                placeholder={t("site.catalogue.search_placeholder")}
            />
            {compact && (
                <button
                    type="button"
                    aria-label={t("site.catalogue.search_placeholder")}
                    className="rounded-r-md absolute inset-e-0 top-0 h-10 w-10 bg-navy text-white flex items-center justify-center"
                    onClick={() => {
                        if (options.length) {
                            setOpen(false);
                            onResultSelect?.();
                            router.visit(options[Math.max(active, 0)].href);
                        } else {
                            setOpen(true);
                        }
                    }}
                >
                    <SearchIcon className="size-4" />
                </button>
            )}
            {visible && (
                <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-md border bg-white p-2 text-navy shadow-xl">
                    <p role="status" className="px-3 text-sm text-paragraph">
                        {status === "loading"
                            ? t("site.catalogue.searching")
                            : status === "error"
                              ? t("site.catalogue.search_error")
                              : options.length === 0
                                ? t("site.catalogue.no_results")
                                : null}
                    </p>
                    {status === "error" && (
                        <button
                            type="button"
                            className="px-3 py-2 font-bold text-navy-secondary"
                            onClick={() => {
                                setStatus("loading");
                                setRetry((current) => current + 1);
                            }}
                        >
                            {t("site.catalogue.retry")}
                        </button>
                    )}
                    <div
                        id={`${id}-results`}
                        role="listbox"
                        aria-label={t("site.catalogue.search_results")}
                        aria-busy={status === "loading"}
                    >
                        {options.map((item, index) => (
                            <Link
                                key={item.key}
                                id={`${id}-option-${index}`}
                                role="option"
                                aria-selected={active === index}
                                href={item.href}
                                onClick={() => {
                                    setOpen(false);
                                    setValue("");
                                    setResults(emptyResults);
                                    requestVersion.current++;
                                    onResultSelect?.();
                                }}
                                className={`flex flex-col rounded px-3 py-2 text-sm hover:bg-navy-secondary/10 focus:bg-navy-secondary/10 ${active === index ? "bg-navy-secondary/10" : ""}`}
                            >
                                <span className="font-bold">{item.label}</span>
                                {(item.supplier || item.technology) && (
                                    <span className="text-xs text-paragraph">
                                        {[item.supplier, item.technology]
                                            .filter(Boolean)
                                            .join(" · ")}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
