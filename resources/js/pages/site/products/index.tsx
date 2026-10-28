import IndexHeroSection from "@/components/site/products/index-hero-section";
import LinedTitle from "@/components/ui/lined-title";

const Index = () => {
    return (
        <>
            <IndexHeroSection />
            <div className={"px-page-padding py-18"}>
                <LinedTitle>Browse by technology</LinedTitle>
            </div>
        </>
    );
};

export default Index;
