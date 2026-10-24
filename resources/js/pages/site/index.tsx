import HomeHero from "@/components/site/home/home-hero";
import ProductFamily from "@/models/product-family";

const Index = ({ families }: { families: ProductFamily[] }) => {
    return (
        <div className={"py-5"}>
            <HomeHero families={families} />
        </div>
    );
};

export default Index;
