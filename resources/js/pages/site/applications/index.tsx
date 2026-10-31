import { Head, Link } from "@inertiajs/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import MarketApplication from "@/models/market-application";
import { translate } from "@/models/translatable";
import SpectrumLine from "@/components/ui/spectrum-line";
import PublicRichText from "@/components/site/public-rich-text";
import PublicReveals from "@/components/site/public-reveals";

export default function Applications({
    applications,
}: {
    applications: MarketApplication[];
}) {
    return (
        <PublicReveals className="applications-page">
            <Head title="Applications | Mapping Solutions">
                <meta
                    name="description"
                    content="Explore remote sensing applications across research, environment, infrastructure, industry and defence."
                />
            </Head>
            <section className="relative overflow-hidden bg-[#08182f] py-16 text-white md:py-24">
                <div className="mx-auto max-w-[1180px] px-[26px]">
                    <SpectrumLine className="mb-7 h-[5px] w-28 rounded" />
                    <p className="mb-5 text-xs font-extrabold uppercase tracking-[.2em] text-[#6ba7e8]">
                        Applications
                    </p>
                    <h1 className="max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight md:text-5xl">
                        Start with the measurement.
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-[#a9c4e2]">
                        Specify what must be detected, over what area and to
                        what accuracy. Explore the application areas below, then
                        talk to our engineers about your requirement.
                    </p>
                </div>
            </section>
            <div className="mx-auto max-w-[1180px] px-[26px] py-14 md:py-20">
                {applications.length ? (
                    <>
                        <div className="mb-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {applications.map((a) => (
                                <a
                                    key={a.id}
                                    href={`#application-${a.id}`}
                                    className="group flex flex-col rounded-2xl border border-[#e3e8ef] p-7 transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a5fb4]"
                                >
                                    <span
                                        className="mb-6 flex size-12 items-center justify-center rounded-xl"
                                        style={{
                                            backgroundColor: `${a.theme_color}18`,
                                            color: a.theme_color,
                                        }}
                                    >
                                        <DynamicIcon
                                            name={a.icon_key}
                                            size={23}
                                        />
                                    </span>
                                    <h2 className="mb-3 text-lg leading-snug font-extrabold text-[#0b2140]">
                                        {translate(a.name)}
                                    </h2>
                                    <p className="mb-6 text-sm leading-6 text-[#5b6b7f]">
                                        {translate(a.summary)}
                                    </p>
                                    <span className="mt-auto flex items-center gap-2 text-sm font-bold text-[#1a5fb4]">
                                        Explore application{" "}
                                        <ArrowDown size={15} />
                                    </span>
                                </a>
                            ))}
                        </div>
                        <nav
                            aria-label="Application areas"
                            className="mb-16 flex flex-wrap gap-3 border-y border-[#e3e8ef] py-5"
                        >
                            {applications.map((a) => (
                                <a
                                    key={a.id}
                                    href={`#application-${a.id}`}
                                    className="rounded-full bg-[#f6f8fb] px-4 py-2 text-xs font-bold text-[#0b2140] hover:bg-[#e8f1fb]"
                                >
                                    {translate(a.name)}
                                </a>
                            ))}
                        </nav>
                        <div className="space-y-16 md:space-y-24">
                            {applications.map((a, i) => (
                                <section
                                    key={a.id}
                                    id={`application-${a.id}`}
                                    className="grid gap-8 border-b border-[#e3e8ef] pb-16 md:grid-cols-[.8fr_1.2fr] md:gap-16"
                                >
                                    <div>
                                        <span
                                            className="mb-5 inline-flex items-center gap-3 text-xs font-extrabold tracking-widest"
                                            style={{ color: a.theme_color }}
                                        >
                                            <DynamicIcon
                                                name={a.icon_key}
                                                size={22}
                                            />{" "}
                                            APPLICATION{" "}
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-[#0b2140]">
                                            {translate(a.name)}
                                        </h2>
                                        <p className="mt-5 text-base leading-7 text-[#5b6b7f]">
                                            {translate(a.summary)}
                                        </p>
                                    </div>
                                    <div>
                                        <PublicRichText
                                            html={translate(a.description)}
                                        />
                                        <Link
                                            href={route("site.contact")}
                                            className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#d63b3b]"
                                        >
                                            Discuss your requirement{" "}
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </section>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="rounded-2xl border border-[#e3e8ef] bg-[#f6f8fb] p-10">
                        <h2 className="text-2xl font-extrabold text-[#0b2140]">
                            Tell us about your application
                        </h2>
                        <p className="mt-4 text-[#5b6b7f]">
                            Contact our engineers to discuss your measurement
                            requirements.
                        </p>
                    </div>
                )}
            </div>
            <section className="bg-[#0b2140] px-[26px] py-16 text-center text-white">
                <h2 className="text-3xl font-extrabold">
                    What do you need to measure?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#a9c4e2]">
                    Tell us about your target, operating environment and
                    required accuracy so we can discuss the next step.
                </p>
                <Link
                    href={route("site.contact")}
                    className="mt-7 inline-flex items-center gap-3 rounded-lg bg-[#d63b3b] px-7 py-4 text-sm font-bold hover:bg-[#bd3030]"
                >
                    Talk to our technical team <ArrowRight size={17} />
                </Link>
            </section>
            <SpectrumLine />
        </PublicReveals>
    );
}
