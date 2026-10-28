import IndexHeroSection from "@/components/site/products/index-hero-section";
import ProductTechnology from "@/models/product-technology";
import ProductTechnologiesGrid from "@/components/site/home/product-technologies-grid";

const Index = ({ technologies }: { technologies: ProductTechnology[] }) => {
    return (
        <>
            <IndexHeroSection />
            <div className={"px-page-padding py-18"}>
                <ProductTechnologiesGrid technologies={technologies} />
            </div>
        </>
    );
};

export default Index;
