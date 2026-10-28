import SpectrumLine from "@/components/ui/spectrum-line";
import ProductTechnologiesGrid from "@/components/site/product-technologies/product-technologies-grid";
import ProductTechnology from "@/models/product-technology";
import { Separator } from "@/components/ui/separator";
import HeroCounts from "@/components/site/home/hero-counts";
import SectionTitle from "@/components/ui/section-title";
import SectionDescription from "@/components/ui/section-description";

const HomeHero = ({ technologies }: { technologies: ProductTechnology[] }) => {
    return (
        <div className={"flex flex-col items-start px-page-padding"}>
            <SectionTitle>
                Instrumentation for measurement beyond the visible spectrum
            </SectionTitle>
            <SpectrumLine className={"h-0.5 my-5"} />
            <SectionDescription>
                Spectral, thermal, ranging and positioning systems from leading
                international manufacturers, supplied with selection advice and
                technical support from our engineers in the UK. Serving
                research, defence and industry since 2004.
            </SectionDescription>
            <ProductTechnologiesGrid technologies={technologies} />
            <Separator className={"my-10"} />
            <HeroCounts />
        </div>
    );
};

export default HomeHero;
