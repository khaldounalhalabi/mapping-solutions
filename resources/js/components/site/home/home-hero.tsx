import SpectrumLine from "@/components/ui/spectrum-line";
import ProductTechnologiesGrid from "@/components/site/home/product-technologies-grid";
import ProductTechnology from "@/models/product-technology";
import { Separator } from "@/components/ui/separator";
import HeroCounts from "@/components/site/home/hero-counts";

const HomeHero = ({ technologies }: { technologies: ProductTechnology[] }) => {
    return (
        <div className={"flex flex-col items-start px-32"}>
            <h1 className={"text-navy font-bold text-4xl"}>
                Instrumentation for measurement beyond the visible spectrum
            </h1>
            <SpectrumLine className={"h-0.5 my-5"} />
            <p className={"text-sm text-gray-500 max-w-2/3"}>
                Spectral, thermal, ranging and positioning systems from leading
                international manufacturers, supplied with selection advice and
                technical support from our engineers in the UK. Serving
                research, defence and industry since 2004.
            </p>
            <ProductTechnologiesGrid technologies={technologies} />
            <Separator className={"my-10"} />
            <HeroCounts />
        </div>
    );
};

export default HomeHero;
