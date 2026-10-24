import SpectrumLine from "@/components/ui/spectrum-line";

const HomeHero = () => {
    return (
        <div className={"flex flex-col items-start px-32"}>
            <h1 className={"text-navy font-bold text-4xl"}>
                Instrumentation for measurement beyond the visible spectrum
            </h1>
            <SpectrumLine className={"h-0.5"} />
            <p className={"text-sm text-gray-500 max-w-2/3"}>
                Spectral, thermal, ranging and positioning systems from leading
                international manufacturers, supplied with selection advice and
                technical support from our engineers in the UK. Serving
                research, defence and industry since 2004.
            </p>
        </div>
    );
};

export default HomeHero;
