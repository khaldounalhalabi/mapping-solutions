import { formatNumber } from "@/hooks/use-translation";
import { translateKey } from "@/hooks/use-translation";
import { translate } from "@/models/translatable";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import Supplier from "@/models/supplier";
import ProductRange from "@/models/product-range";
import { buttonVariants } from "@/components/ui/button";
import SpectrumLine from "@/components/ui/spectrum-line";
import LightSpectrum from "@/components/site/icons/light-spectrum";
import useSettings from "@/hooks/use-settings";
import SettingKeyEnum from "@/enums/setting-key-enum";

const rangeTranslation = (value: string) =>
    translate(value) || translate(value, true).en || "";

const steps = [
    {
        title: translateKey("site.copy.understand_the_measurement"),
        copy:  translateKey(
            "site.copy.what_needs_to_be_detected_over_what_area_at_what_resolution_and_from_which_platform_these_",
        ),
    },
    {
        title: translateKey("site.copy.match_it_independently"),
        copy:  translateKey(
            "site.copy.we_represent_specialist_manufacturers_across_hyperspectral_thermal_lidar_and_spectroradiom",
        ),
    },
    {
        title: translateKey("site.copy.or_fly_it_for_you"),
        copy:  translateKey(
            "site.copy.we_operate_our_own_airborne_survey_capability_covering_hyperspectral_lidar_thermal_photogr",
        ),
    },
    {
        title: translateKey("site.copy.support_and_training"),
        copy:  translateKey(
            "site.copy.technical_support_calibration_and_repair_are_handled_in_the_uk_we_also_run_hands_on_traini",
        ),
    },
];

const Index = ({
    suppliers,
    ranges,
}: {
    suppliers: Supplier[];
    ranges:    ProductRange[];
}) => {
    const bands = ranges;
    const [activeBand, setActiveBand] = useState(0);
    const [isCycling, setIsCycling] = useState(true);
    const explorerRef = useRef<HTMLElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const bandRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const band = bands[activeBand];
    const { valueOf } = useSettings();
    const {
        props: { suppliers_count, products_count },
    } = usePage();

    useEffect(() => {
        const preference = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        let frame: number | undefined;
        let startedAt: number | undefined;
        let visible = false;
        const tick = (time: number) => {
            startedAt ??= time;
            const progress = Math.min((time - startedAt) / 6000, 1);
            if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${progress})`;
            }
            if (progress === 1) {
                setActiveBand((current) => (current + 1) % bands.length);
                return;
            }
            frame = requestAnimationFrame(tick);
        };
        const updateTimer = () => {
            if (frame !== undefined) {
                cancelAnimationFrame(frame);
            }
            startedAt = undefined;
            if (
                visible &&
                isCycling &&
                !preference.matches &&
                !document.hidden
            ) {
                frame = requestAnimationFrame(tick);
            }
        };
        const observer = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting;
                updateTimer();
            },
            { threshold: 0.25 },
        );
        if (explorerRef.current) {
            observer.observe(explorerRef.current);
        }
        preference.addEventListener("change", updateTimer);
        document.addEventListener("visibilitychange", updateTimer);
        return () => {
            if (frame !== undefined) {
                cancelAnimationFrame(frame);
            }
            observer.disconnect();
            preference.removeEventListener("change", updateTimer);
            document.removeEventListener("visibilitychange", updateTimer);
        };
    }, [isCycling, activeBand]);

    const selectBand = (index: number) => {
        setIsCycling(false);
        setActiveBand(index);
    };
    return (
        <div>
            <section
                className={
                    "bg-hero relative isolate w-full overflow-hidden px-6 sm:px-10 lg:px-16 xl:px-48"
                }
            >
                <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:min-h-160 lg:grid-cols-[1.02fr_0.98fr]">
                    <div
                        className={
                            "flex min-w-0 flex-col items-start gap-5 pt-16 lg:py-23"
                        }
                    >
                        <SpectrumLine className={"w-16 h-1"} />
                        <h2
                            className={
                                "text-navy-hero uppercase font-extrabold text-xs starting:translate-y-5 starting:opacity-0 translate-0 opacity-100 transition-all duration-700 ease-out"
                            }
                        >
                            {" "}
                            {translateKey(
                                "site.copy.about_mapping_solutions",
                            )}{" "}
                        </h2>
                        <h1
                            className={
                                "text-[clamp(2.3rem,5.2vw,3.9rem)] leading-[1.05] tracking-tight text-white font-extrabold starting:translate-y-6 starting:opacity-0 translate-0 opacity-100 transition-all duration-800 ease-out"
                            }
                        >
                            {" "}
                            {translateKey(
                                "site.copy.remote_sensing_instruments_and",
                            )}{" "}
                            <span className="about-spectrum-text bg-spectrum bg-clip-text text-transparent">
                                {" "}
                                {translateKey(
                                    "site.copy.the_people_who_fly_them",
                                )}{" "}
                            </span>
                        </h1>
                        <p
                            className={
                                "text-base leading-relaxed text-white/80 max-w-[48ch] starting:translate-y-7 starting:opacity-0 translate-0 opacity-100 transition-all duration-900 ease-out"
                            }
                        >
                            {" "}
                            {translateKey(
                                "site.copy.founded_in_2004_we_supply_lidar_hyperspectral_and_spectroradiometer_systems_from_leading_m",
                            )}{" "}
                        </p>
                        <div className={"grid grid-cols-3 w-full gap-3"}>
                            <div className={"space-y-1"}>
                                <h2
                                    className={
                                        "text-3xl text-band font-extrabold"
                                    }
                                >
                                    {new Date().getFullYear() -
                                        (valueOf(SettingKeyEnum.START_YEAR) ??
                                            0)}
                                    +
                                </h2>
                                <p
                                    className={
                                        "text-white/50 text-[11px] font-bold uppercase tracking-wider"
                                    }
                                >
                                    {" "}
                                    {translateKey("site.copy.years")}{" "}
                                </p>
                            </div>
                            <div className={"space-y-1"}>
                                <h2
                                    className={
                                        "text-3xl text-band font-extrabold"
                                    }
                                >
                                    {formatNumber(suppliers_count ?? 0)}
                                </h2>
                                <p
                                    className={
                                        "text-white/50 text-[11px] font-bold uppercase tracking-wider"
                                    }
                                >
                                    {" "}
                                    {translateKey(
                                        "site.copy.manufacturers_2",
                                    )}{" "}
                                </p>
                            </div>
                            <div className={"space-y-1"}>
                                <h2
                                    className={
                                        "text-3xl text-band font-extrabold"
                                    }
                                >
                                    {formatNumber(products_count ?? 0)}
                                </h2>
                                <p
                                    className={
                                        "text-white/50 text-[11px] font-bold uppercase tracking-wider"
                                    }
                                >
                                    {" "}
                                    {translateKey("site.copy.instruments")}{" "}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative mb-11 min-h-67.5 w-full lg:mb-0 lg:h-full lg:min-h-110"
                        aria-hidden="true"
                    >
                        <LightSpectrum className="absolute inset-0 h-full w-full" />
                    </div>
                </div>
            </section>
            <section
                className={
                    "mx-auto w-full max-w-7xl space-y-8 px-6 py-18 sm:px-10 lg:px-16 lg:py-28"
                }
            >
                <h1
                    className={
                        "max-w-[22ch] text-navy text-[clamp(1.55rem,3.6vw,2.5rem)] leading-tight font-extrabold starting:translate-y-5 starting:opacity-0 translate-0 opacity-100 transition-all duration-700 ease-out"
                    }
                >
                    {" "}
                    {translateKey(
                        "site.copy.a_hyperspectral_sensor_doesn_t_take_a",
                    )}{" "}
                    <span
                        className={
                            "border-b-4 [border-image:var(--spectrum)_1]"
                        }
                    >
                        {" "}
                        {translateKey("site.copy.photograph")}{" "}
                    </span>
                </h1>
                <p
                    className={
                        "max-w-[58ch] text-paragraph text-[15.5px] leading-[1.88] starting:translate-y-5 starting:opacity-0 translate-0 opacity-100 transition-all duration-700 ease-out"
                    }
                >
                    {" "}
                    {translateKey(
                        "site.copy.it_records_hundreds_of_narrow_wavelength_bands_for_every_pixel_so_a_mineral_a_crop_disease",
                    )}{" "}
                    <strong className={"font-bold text-navy"}>
                        {" "}
                        {translateKey(
                            "site.copy.an_instrument_specified_for_the_wrong_question_can_t_be_corrected_afterwards",
                        )}{" "}
                    </strong>{" "}
                    {translateKey(
                        "site.copy.helping_customers_get_that_decision_right_is_most_of_what_we_do",
                    )}{" "}
                </p>
            </section>

            {band && (
                <section
                    ref={explorerRef}
                    aria-labelledby="spectrum-heading"
                    className="relative isolate overflow-hidden bg-[#08182f] py-17.5 text-white min-[981px]:py-26"
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(#ffffff21_1px,transparent_1.6px)] bg-size-[44px_44px] mask-[radial-gradient(70%_70%_at_50%_40%,black,transparent_78%)]"
                    />
                    <div className="mx-auto max-w-295 px-6.5">
                        <h2
                            id="spectrum-heading"
                            className="max-w-[22ch] text-[clamp(1.65rem,3.3vw,2.3rem)] leading-tight font-extrabold tracking-tight"
                        >
                            {" "}
                            {translateKey(
                                "site.copy.different_questions_live_in_different_bands",
                            )}{" "}
                        </h2>
                        <p className="mt-4 max-w-[58ch] text-[15.5px] leading-relaxed text-[#a9c4e2]">
                            {" "}
                            {translateKey(
                                "site.copy.a_quick_tour_of_the_ranges_we_supply_instruments_for_and_what_each_one_is_used_to_measure_",
                            )}{" "}
                        </p>
                        <div className="relative mt-11">
                            <div
                                role="tablist"
                                aria-label={translateKey(
                                    "site.copy.instrument_wavelength_bands",
                                )}
                                className="grid grid-cols-5 gap-1"
                            >
                                {bands.map((item, index) => (
                                    <button
                                        key={item.label}
                                        ref={(node) => {
                                            bandRefs.current[index] = node;
                                        }}
                                        type="button"
                                        role="tab"
                                        id={`band-${index}`}
                                        aria-controls="band-detail"
                                        aria-selected={activeBand === index}
                                        tabIndex={activeBand === index ? 0 : -1}
                                        onClick={() => selectBand(index)}
                                        onKeyDown={(event) => {
                                            let next = index;
                                            if (event.key === "ArrowRight") {
                                                next =
                                                    (index + 1) % bands.length;
                                            } else if (
                                                event.key === "ArrowLeft"
                                            ) {
                                                next =
                                                    (index + bands.length - 1) %
                                                    bands.length;
                                            } else if (event.key === "Home") {
                                                next = 0;
                                            } else if (event.key === "End") {
                                                next = bands.length - 1;
                                            } else {
                                                return;
                                            }
                                            event.preventDefault();
                                            selectBand(next);
                                            bandRefs.current[next]?.focus();
                                        }}
                                        className="relative min-w-0 cursor-pointer text-start outline-offset-4 focus-visible:outline-2 focus-visible:outline-white"
                                    >
                                        <span
                                            className={`mt-3 block text-[10px] font-bold tracking-wide min-[621px]:text-[11.5px] ${activeBand === index ? "text-white" : "text-[#7d9dc4]"}`}
                                        >
                                            {item.label}
                                        </span>
                                        <span className="mt-0.75 hidden text-[10.5px] text-[#5f80a8] min-[621px]:block">
                                            {item.range}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div
                            aria-hidden="true"
                            className={`mt-6.5 h-0.5 overflow-hidden rounded-xs bg-white/12 transition-opacity duration-400 motion-reduce:opacity-0 ${isCycling ? "opacity-100" : "opacity-0"}`}
                        >
                            <div
                                ref={progressRef}
                                style={{ backgroundColor: band.colour }}
                                className="h-full origin-inline-start transform-[scaleX(0)] rounded-xs transition-colors duration-350"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsCycling(!isCycling)}
                            aria-pressed={isCycling}
                            className="sr-only rounded text-xs text-white focus:not-sr-only focus:mt-3 focus:p-2 focus:outline-2 focus:outline-white"
                        >
                            {isCycling
                                ? translateKey(
                                      "site.extra.pause_automatic_cycling",
                                  )
                                : translateKey(
                                      "site.extra.resume_automatic_cycling",
                                  )}
                        </button>
                        <div
                            id="band-detail"
                            role="tabpanel"
                            aria-labelledby={`band-${activeBand}`}
                            tabIndex={0}
                            style={{ borderLeftColor: band.colour }}
                            className="mt-6.5 grid gap-6 rounded-[18px] border border-white/13 border-s-4 bg-white/5 px-6 py-6.5 outline-offset-4 min-[981px]:min-h-44 min-[981px]:grid-cols-[1.12fr_0.88fr] min-[981px]:gap-10 min-[981px]:px-9 min-[981px]:py-8.5"
                        >
                            <div>
                                <h3 className="text-xl font-extrabold tracking-tight">
                                    {rangeTranslation(band.title)}
                                </h3>
                                <p className="mt-3 text-sm leading-[1.82] text-[#b8cfe8]">
                                    {rangeTranslation(band.description)}
                                </p>
                            </div>
                            <ul className="flex flex-col gap-3">
                                {rangeTranslation(band.uses)
                                    .split(/\r?\n/)
                                    .filter(Boolean)
                                    .map((use) => (
                                        <li
                                            key={use}
                                            className="flex items-start gap-3 text-sm leading-relaxed text-[#d3e3f5]"
                                        >
                                            <span
                                                aria-hidden="true"
                                                style={{
                                                    backgroundColor:
                                                        band.colour,
                                                }}
                                                className="mt-2 size-1.75 shrink-0 rounded-full"
                                            />
                                            {use}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )}
            <section
                aria-labelledby="process-heading"
                className="mx-auto max-w-7xl px-6 py-18 sm:px-10 lg:px-16 lg:py-27"
            >
                <p className="text-xs font-extrabold tracking-[0.2em] text-navy-secondary uppercase">
                    {" "}
                    {translateKey("site.copy.how_we_work")}{" "}
                </p>
                <h2
                    id="process-heading"
                    className="mt-6 max-w-[27ch] text-[clamp(1.65rem,3.3vw,2.3rem)] leading-tight font-extrabold tracking-tight text-navy"
                >
                    {" "}
                    {translateKey(
                        "site.copy.from_the_measurement_to_the_instrument_to_the_data",
                    )}{" "}
                </h2>
                <ol className="relative mt-14 before:absolute before:inset-y-8 before:start-6 before:w-0.75 before:bg-spectrum lg:before:start-7">
                    {steps.map((step, index) => (
                        <li
                            key={step.title}
                            className="relative grid grid-cols-[48px_1fr] items-start gap-5 py-8 lg:grid-cols-[96px_1fr] lg:gap-8"
                        >
                            <span className="relative flex size-12 items-center justify-center rounded-full border-3 border-navy-secondary bg-white text-sm font-extrabold text-navy-secondary lg:size-14">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div>
                                <h3 className="mt-2 text-xl font-extrabold text-navy">
                                    {step.title}
                                </h3>
                                <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.85] text-paragraph">
                                    {step.copy}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>
            <section
                aria-labelledby="manufacturers-heading"
                className="bg-bg-secondary py-18 lg:py-24"
            >
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                    <h2
                        id="manufacturers-heading"
                        className="text-3xl font-extrabold tracking-tight text-navy"
                    >
                        {" "}
                        {translateKey(
                            "site.copy.manufacturers_we_represent",
                        )}{" "}
                    </h2>
                    <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-paragraph">
                        {" "}
                        {translateKey(
                            "site.copy.we_work_directly_with_the_manufacturers_which_means_technical_questions_reach_the_people_w",
                        )}{" "}
                    </p>
                    <div className="mt-11 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
                        {suppliers.map((supplier) => (
                            <Link
                                key={supplier.id}
                                href={route("site.suppliers")}
                                aria-label={`Explore ${supplier.name} instruments`}
                                className="flex items-center justify-center overflow-hidden rounded-md border border-gray-200 transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                            >
                                {supplier.logo?.url ? (
                                    <img
                                        src={supplier.logo?.url}
                                        alt={supplier.name + "-logo"}
                                        className="h-full w-full object-fill"
                                    />
                                ) : (
                                    <span className="text-center text-sm font-bold text-navy">
                                        {supplier.name}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-12 grid gap-4 sm:grid-cols-3">
                        <div className="h-full rounded-xl border bg-white p-6">
                            <p className="text-[11px] font-extrabold tracking-widest text-paragraph uppercase">
                                {" "}
                                {translateKey("site.copy.where_we_work")}{" "}
                            </p>
                            <a
                                href={valueOf(
                                    SettingKeyEnum.ADDRESS_GOOGLE_MAP_URL,
                                    "#",
                                )}
                                target={"_blank"}
                                className="mt-2 inline-block text-[15px] leading-relaxed font-bold text-navy hover:underline"
                            >
                                {valueOf(
                                    SettingKeyEnum.ADDRESS,
                                    "United Kingdom, Middle East; North Africa",
                                )}
                            </a>
                        </div>
                        <div className="h-full rounded-xl border bg-white p-6">
                            <p className="text-[11px] font-extrabold tracking-widest text-paragraph uppercase">
                                {" "}
                                {translateKey("site.copy.languages")}{" "}
                            </p>
                            <p className="mt-2 text-[15px] leading-relaxed font-bold text-navy">
                                {" "}
                                {translateKey(
                                    "site.copy.english_arabic_french",
                                )}{" "}
                            </p>
                        </div>
                        <div className="h-full rounded-xl border bg-white p-6">
                            <p className="text-[11px] font-extrabold tracking-widest text-paragraph uppercase">
                                {" "}
                                {translateKey("site.copy.speak_to_us")}{" "}
                            </p>
                            <a
                                href={`tel:${valueOf(SettingKeyEnum.CONTACT_PHONE, "+44 8251 99303")}`}
                                className="mt-2 inline-block text-[15px] leading-relaxed font-bold text-navy hover:underline"
                                target={"_blank"}
                            >
                                {valueOf(
                                    SettingKeyEnum.CONTACT_PHONE,
                                    "+44 8251 99303",
                                )}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative isolate overflow-hidden bg-hero px-6 py-20 text-center text-white lg:py-25">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(110%_150%_at_20%_0%,#0f3159,#08182f_72%)]"
                />
                <h2 className="text-[clamp(1.75rem,3.7vw,2.5rem)] leading-tight font-extrabold tracking-tight">
                    {" "}
                    {translateKey(
                        "site.copy.tell_us_what_you_need_to_measure",
                    )}{" "}
                </h2>
                <p className="mx-auto mt-4 max-w-[56ch] text-base leading-relaxed text-[#a9c4e2]">
                    {" "}
                    {translateKey(
                        "site.copy.send_us_the_measurement_problem_and_we_ll_advise_on_the_band_the_instrument_and_the_platfo",
                    )}{" "}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                        href="tel:+44825199303"
                        className={buttonVariants({
                            variant:   "hero",
                            size:      "hero",
                            className:
                                "motion-reduce:transform-none motion-reduce:transition-none",
                        })}
                    >
                        {" "}
                        {translateKey("site.copy.talk_to_our_team")}{" "}
                    </a>
                    <Link
                        href={route("site.products")}
                        className="inline-flex items-center justify-center rounded-lg border border-white/40 px-8 py-4 text-sm font-bold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                        {" "}
                        {translateKey("site.copy.browse_the_catalogue")}{" "}
                    </Link>
                </div>
            </section>
            <SpectrumLine />
        </div>
    );
};

export default Index;
