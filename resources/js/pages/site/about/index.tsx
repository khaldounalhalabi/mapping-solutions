import SpectrumLine from "@/components/ui/spectrum-line";
import LightSpectrum from "@/components/site/icons/light-spectrum";

const Index = () => {
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
                            About Mapping Solutions
                        </h2>
                        <h1
                            className={
                                "text-[clamp(2.3rem,5.2vw,3.9rem)] leading-[1.05] tracking-tight text-white font-extrabold starting:translate-y-6 starting:opacity-0 translate-0 opacity-100 transition-all duration-800 ease-out"
                            }
                        >
                            Remote sensing instruments and{" "}
                            <span className="about-spectrum-text bg-spectrum bg-clip-text text-transparent">
                                the people who fly them
                            </span>
                        </h1>
                        <p
                            className={
                                "text-base leading-relaxed text-white/80 max-w-[48ch] starting:translate-y-7 starting:opacity-0 translate-0 opacity-100 transition-all duration-900 ease-out"
                            }
                        >
                            Founded in 2004, we supply LiDAR, hyperspectral and
                            spectroradiometer systems from leading
                            manufacturers, and operate our own airborne survey
                            capability.
                        </p>
                        <div className={"grid grid-cols-3 w-full gap-3"}>
                            {/*TODO: make those come from the settings API*/}
                            <div className={"space-y-1"}>
                                <h2
                                    className={
                                        "text-3xl text-band font-extrabold"
                                    }
                                >
                                    22+
                                </h2>
                                <p className={"text-paragraph font-bold"}>
                                    Years
                                </p>
                            </div>
                            <div className={"space-y-1"}>
                                <h2
                                    className={
                                        "text-3xl text-band font-extrabold"
                                    }
                                >
                                    9
                                </h2>
                                <p className={"text-paragraph font-bold"}>
                                    Manufacturers
                                </p>
                            </div>
                            <div className={"space-y-1"}>
                                <h2
                                    className={
                                        "text-3xl text-band font-extrabold"
                                    }
                                >
                                    24
                                </h2>
                                <p className={"text-paragraph font-bold"}>
                                    Instruments
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
            <section className={"px-page-padding space-y-8 py-24 max-w-1/2"}>
                <h1
                    className={
                        "text-navy text-4xl font-extrabold starting:translate-y-5 starting:opacity-0 translate-0 opacity-100 transition-all duration-700 ease-out"
                    }
                >
                    A hyperspectral sensor doesn't take a{" "}
                    <span
                        className={
                            "border-b-4 [border-image:var(--spectrum)_1]"
                        }
                    >
                        photograph
                    </span>
                </h1>
                <p
                    className={
                        "text-paragraph text-sm starting:translate-y-5 starting:opacity-0 translate-0 opacity-100 transition-all duration-700 ease-out"
                    }
                >
                    It records hundreds of narrow wavelength bands for every
                    pixel, so a mineral, a crop disease or a gas plume can be
                    identified by its spectral signature rather than its
                    appearance. Which bands you need, at what resolution, from
                    which platform, depends entirely on the question being asked
                    and{" "}
                    <strong className={"font-bold text-navy"}>
                        an instrument specified for the wrong question can't be
                        corrected afterwards.
                    </strong>{" "}
                    Helping customers get that decision right is most of what we
                    do.
                </p>
            </section>
        </div>
    );
};

export default Index;
