import HomeHero from "@/components/site/home/home-hero";
import ProductTechnology from "@/models/product-technology";
import SpectrumLine from "@/components/ui/spectrum-line";
import MarketApplication from "@/models/market-application";
import ApplicationsSection from "@/components/site/home/applications-section";

const Index = ({
    technologies,
    applications,
}: {
    technologies: ProductTechnology[];
    applications: MarketApplication[];
}) => {
    return (
        <div className={"py-5"}>
            <HomeHero technologies={technologies} />
            <SpectrumLine className={"my-10"} />
            <ApplicationsSection applications={applications} />
        </div>
    );
};

export default Index;
