import SpectrumLine from "@/components/ui/spectrum-line";
import { useTranslation } from "@/hooks/use-translation";
import { Link } from "@inertiajs/react";
import { XIcon } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const whatsappNumber = "2180913870938";
const topics = ["product", "quote", "survey", "advice"] as const;

export default function WhatsappChat() {
    const { t, locale } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [openedAt, setOpenedAt] = useState<Date | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelId = useId();
    const isOnline =
        openedAt !== null &&
        openedAt.getUTCDay() >= 1 &&
        openedAt.getUTCDay() <= 5 &&
        openedAt.getUTCHours() >= 9 &&
        openedAt.getUTCHours() < 17;

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        panelRef.current?.focus();

        function handlePointerDown(event: PointerEvent) {
            if (
                event.target instanceof Node &&
                !containerRef.current?.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
                triggerRef.current?.focus();
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    function chatLink(message: string): string {
        const context =
            typeof window === "undefined"
                ? ""
                : `\n\n— sent from ${window.location.href}`;
        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message + context)}`;
    }

    return (
        <div
            ref={containerRef}
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="fixed end-4 bottom-4 z-40 min-[481px]:end-[26px] min-[481px]:bottom-[26px] print:hidden"
        >
            {isOpen && (
                <div
                    ref={panelRef}
                    id={panelId}
                    role="dialog"
                    aria-labelledby={`${panelId}-title`}
                    tabIndex={-1}
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    className="absolute end-0 bottom-[74px] max-h-[calc(100dvh-110px)] w-[340px] max-w-[calc(100vw-32px)] overflow-y-auto rounded-[18px] bg-white text-[#2c3947] shadow-[0_24px_60px_#0b214047,0_3px_10px_#0b21401a] outline-none max-[480px]:w-[calc(100vw-32px)]"
                >
                    <header className="relative flex items-center gap-3.5 bg-[radial-gradient(130%_180%_at_12%_0%,#123a66,#0b2140_74%)] px-[22px] py-5 text-white">
                        <SpectrumLine className="absolute inset-x-0 top-0 h-[3px]" />
                        <span className="relative flex size-[46px] shrink-0 items-center justify-center rounded-full bg-[#25d366]">
                            <FaWhatsapp
                                className="size-[26px]"
                                aria-hidden="true"
                            />
                            <span
                                className={`absolute -right-px -bottom-px size-[13px] rounded-full border-[2.5px] border-[#0b2140] ${isOnline ? "bg-green-400" : "bg-slate-400"}`}
                            />
                        </span>
                        <div>
                            <h2
                                id={`${panelId}-title`}
                                className="text-[15.5px] font-extrabold tracking-tight"
                            >
                                {t("site.chat.name")}
                            </h2>
                            <p className="mt-1 flex items-center gap-1.5 text-[11.5px] font-bold text-[#a9c4e2]">
                                <span
                                    className={`size-1.5 shrink-0 rounded-full ${isOnline ? "bg-green-400" : "bg-slate-400"}`}
                                    aria-hidden="true"
                                />
                                {t(
                                    isOnline
                                        ? "site.chat.online"
                                        : "site.chat.status",
                                )}
                            </p>
                        </div>
                    </header>
                    <div className="bg-[#f7f9fc] bg-[radial-gradient(#0b21400b_1px,transparent_1.5px)] bg-size-[22px_22px] px-5 pt-[22px] pb-5">
                        <div className="mb-[9px] max-w-[92%] rounded-[3px_15px_15px_15px] bg-white px-4 py-[13px] text-[13.5px] leading-[1.62] shadow-[0_2px_8px_#0b214017] rtl:rounded-[15px_3px_15px_15px]">
                            <strong className="font-extrabold text-[#0b2140]">
                                {t("site.chat.hello")}
                            </strong>{" "}
                            {t("site.chat.introduction")}
                        </div>
                        <p className="mb-[9px] max-w-[92%] rounded-[15px] bg-white px-4 py-[13px] text-[13.5px] leading-[1.62] shadow-[0_2px_8px_#0b214017]">
                            {t("site.chat.prompt")}
                        </p>
                        <time
                            dateTime={openedAt?.toISOString()}
                            className="mb-4 block ps-1 text-[10.5px] text-[#93a3b6]"
                        >
                            {openedAt?.toLocaleTimeString(locale, {
                                hour:     "2-digit",
                                minute:   "2-digit",
                                hour12:   false,
                                timeZone: "UTC",
                            })}
                        </time>
                        <p className="mb-[9px] ps-0.5 text-[10px] font-extrabold tracking-[0.13em] text-[#8896a8] uppercase">
                            {t("site.chat.quick_start")}
                        </p>
                        <div className="mb-[18px] flex flex-wrap gap-[7px]">
                            {topics.map((topic) => (
                                <a
                                    key={topic}
                                    href={chatLink(
                                        t(`site.chat.topics.${topic}.message`),
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full border border-[#dbe4f0] bg-white px-3.5 py-2 text-[12.5px] font-bold text-[#0b2140] hover:border-[#0b2140] hover:bg-[#0b2140] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b2140]"
                                >
                                    {t(`site.chat.topics.${topic}.label`)}
                                </a>
                            ))}
                        </div>
                        <a
                            href={chatLink(t("site.chat.default_message"))}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 rounded-[11px] bg-[#25d366] px-5 py-3.5 text-[14.5px] font-extrabold text-white shadow-[0_8px_20px_#25d36652] hover:bg-[#1da851] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b2140]"
                        >
                            <FaWhatsapp
                                className="size-[19px]"
                                aria-hidden="true"
                            />
                            {t("site.chat.start")}
                        </a>
                    </div>
                    <footer className="border-t border-[#eaeef4] px-5 pt-[13px] pb-4 text-center">
                        <Link
                            href={route("site.contact")}
                            onClick={() => setIsOpen(false)}
                            className="text-xs font-bold text-[#67768a] hover:text-[#0b2140]"
                        >
                            {t("site.chat.email")}
                        </Link>
                    </footer>
                </div>
            )}
            <button
                ref={triggerRef}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-haspopup="dialog"
                aria-label={t(isOpen ? "site.chat.close" : "site.chat.open")}
                onClick={() => {
                    if (!isOpen) {
                        setOpenedAt(new Date());
                    }
                    setIsOpen(!isOpen);
                }}
                className={`flex cursor-pointer items-center gap-[11px] rounded-full text-white outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#0b2140] ${isOpen ? "bg-[#0b2140] p-[15px] shadow-[0_8px_22px_#0b214061]" : "bg-[#25d366] p-3.5 shadow-[0_8px_22px_#25d36666,0_2px_8px_#0b214029] hover:bg-[#1da851] min-[481px]:py-[13px] min-[481px]:pe-5"}`}
            >
                {isOpen ? (
                    <XIcon className="size-[22px]" aria-hidden="true" />
                ) : (
                    <>
                        <FaWhatsapp
                            className="size-[26px]"
                            aria-hidden="true"
                        />
                        <span className="hidden text-sm font-extrabold tracking-tight min-[481px]:inline">
                            {t("site.chat.launcher")}
                        </span>
                    </>
                )}
            </button>
        </div>
    );
}
