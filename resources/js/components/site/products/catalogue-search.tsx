import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/use-translation";
import Product from "@/models/product";
import { translate } from "@/models/translatable";
import Http from "@/modules/http/http";
import { Link, router } from "@inertiajs/react";
import { SearchIcon } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { isEmptyObject } from "@/helper";

interface SearchResults {
    products: Product[];
}

const emptyResults: SearchResults = { products: [] };

export default function CatalogueSearch({
    product_technology_id,
    supplier_id
}: {
    product_technology_id?: number;
    supplier_id?: number;
}) {
    const { t } = useTranslation();
    const id = useId();
    const container = useRef<HTMLDivElement>(null);
    const requestVersion = useRef(0);
    const [value, setValue] = useState("");
    const [results, setResults] = useState<SearchResults>(emptyResults);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);
    const [status, setStatus] = useState<
        "idle" | "loading" | "ready" | "error"
    >("idle");
    const [retry, setRetry] = useState(0);
    const visible = open && value.trim().length >= 2;
    const options = results.products.map((product) => ({
        key:        `product-${product.id}`,
        label:      translate(product.name),
        supplier:   product.supplier?.name,
        technology: product.product_technology
            ? translate(product.product_technology.name)
            : undefined,
        href:       route("site.products.show", product.slug),
    }));

    const filters = useCallback(() => {
        let filters = {};

        if (product_technology_id) {
            filters = {
                ...filters,
                product_technology_id,
            };
        }

        if (supplier_id) {
            filters = {
                ...filters,
                supplier_id
            }
        }

        return isEmptyObject(filters) ? null : filters;
    }, [product_technology_id]);

    useEffect(() => {
        const version = ++requestVersion.current;
        const search = value.trim();
        if (search.length < 2) {
            return;
        }

        const filterFields = filters();
        const timer = window.setTimeout(async () => {
            const response = await Http.make<SearchResults>().get(
                route("site.products.search"),
                { search, ...(filterFields ? filterFields : {}) },
                { Accept: "application/json" },
            );
            if (version !== requestVersion.current) {
                return;
            }
            if (!response.ok() || !response.data) {
                setStatus("error");
                return;
            }
            setResults(response.data);
            setStatus("ready");
        }, 300);
        return () => {
            window.clearTimeout(timer);
            requestVersion.current++;
        };
    }, [value, retry]);

    useEffect(() => {
        const dismiss = (event: PointerEvent) => {
            if (!container.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("pointerdown", dismiss);
        return () => document.removeEventListener("pointerdown", dismiss);
    }, []);

    useEffect(() => {
        if (active >= 0) {
            document
                .getElementById(`${id}-option-${active}`)
                ?.scrollIntoView({ block: "nearest" });
        }
    }, [active, id]);

    return (
        <div
            ref={container}
            className="relative w-2xl max-w-[calc(100vw-2rem)]"
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
                        router.visit(options[Math.max(active, 0)].href);
                    }
                }}
                className="bg-white w-full py-6 shadow-xl px-10"
                placeholder={t("site.catalogue.search_placeholder")}
            />
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
