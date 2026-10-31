import { createElement, ReactNode, useMemo } from "react";

// Render editorial formatting through React; never copy event handlers or arbitrary HTML attributes.
export default function PublicRichText({ html }: { html: string }) {
    const content = useMemo(() => {
        if (typeof DOMParser === "undefined")
            return html.replace(/<[^>]*>/g, "");
        const doc = new DOMParser().parseFromString(html, "text/html");
        const allowed = new Set([
            "p",
            "br",
            "strong",
            "b",
            "em",
            "i",
            "u",
            "s",
            "h2",
            "h3",
            "h4",
            "ul",
            "ol",
            "li",
            "blockquote",
            "hr",
            "a",
            "table",
            "thead",
            "tbody",
            "tr",
            "td",
            "th",
            "img",
        ]);
        const blocked = new Set([
            "script",
            "style",
            "iframe",
            "object",
            "embed",
            "svg",
            "math",
            "form",
            "input",
        ]);
        const render = (node: Node, key: number): ReactNode => {
            if (node.nodeType === Node.TEXT_NODE) return node.textContent;
            if (!(node instanceof Element)) return null;
            const tag = node.tagName.toLowerCase();
            if (blocked.has(tag)) return null;
            const children = Array.from(node.childNodes).map(render);
            if (!allowed.has(tag)) return children;
            const props: Record<string, unknown> = { key };
            if (tag === "a") {
                const href = node.getAttribute("href") ?? "";
                if (/^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(href))
                    props.href = href;
            }
            if (tag === "img") {
                const src = node.getAttribute("src") ?? "";
                if (!/^(https?:\/\/|\/(?!\/))/i.test(src)) return null;
                return createElement("img", {
                    key,
                    src,
                    alt: node.getAttribute("alt") ?? "",
                    loading: "lazy",
                });
            }
            return createElement(tag, props, ...children);
        };
        return Array.from(doc.body.childNodes).map(render);
    }, [html]);
    return <div className="public-prose">{content}</div>;
}
