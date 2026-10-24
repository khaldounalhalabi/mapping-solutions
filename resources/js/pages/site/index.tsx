import HomeHero from "@/components/site/home/home-hero";
import ProductTechnology from "@/models/product-technology";

const Index = ({ technologies }: { technologies: ProductTechnology[] }) => {
    return (
        <div className={"py-5"}>
            <HomeHero technologies={technologies} />
        </div>
    );
};

export default Index;
