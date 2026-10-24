import HomeHero from "@/components/site/home/home-hero";
import ProductTechnology from "@/models/product-technology";
import SpectrumLine from "@/components/ui/spectrum-line";

const Index = ({ technologies }: { technologies: ProductTechnology[] }) => {
    return (
        <div className={"py-5"}>
            <HomeHero technologies={technologies} />
            <SpectrumLine className={"my-10"} />
        </div>
    );
};

export default Index;
