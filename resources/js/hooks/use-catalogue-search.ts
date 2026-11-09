import { siteRoute } from "@/lib/site-route";
import Product from "@/models/product";
import { translate } from "@/models/translatable";
import Http from "@/modules/http/http";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { isEmptyObject } from "@/helper";
import Supplier from "@/models/supplier";

interface SearchResults {
    products:  Product[];
    suppliers: Supplier[];
}
const emptyResults: SearchResults = { products: [], suppliers: [] };
export default function useCatalogueSearch({
    product_technology_id,
    supplier_id,
}: {
    product_technology_id?: number;
    supplier_id?:           number;
}) {
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
    const options = results.products
        .map((product) => ({
            key:        `product-${product.id}`,
            label:      translate(product.name),
            supplier:   product.supplier?.name,
            technology: product.product_technology
                ? translate(product.product_technology.name)
                : undefined,
            href:       siteRoute("site.products.show", product.slug),
        }))
        .concat(
            results.suppliers.map((supplier) => ({
                key:        `supplier-${supplier.id}`,
                label:      supplier.name,
                supplier:   "Supplier",
                technology: undefined,
                href:       siteRoute("site.suppliers.products", supplier.slug),
            })),
        );

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
                supplier_id,
            };
        }

        return isEmptyObject(filters) ? null : filters;
    }, [product_technology_id, supplier_id]);

    useEffect(() => {
        const version = ++requestVersion.current;
        const search = value.trim();
        if (search.length < 2) {
            return;
        }

        const filterFields = filters();
        const timer = window.setTimeout(async () => {
            const response = await Http.make<SearchResults>().get(
                siteRoute("site.search"),
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
    }, [value, retry, product_technology_id, supplier_id]);

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

    return {
        id,
        container,
        requestVersion,
        value,
        setValue,
        results,
        setResults,
        open,
        setOpen,
        active,
        setActive,
        status,
        setStatus,
        setRetry,
        visible,
        options,
    };
}
