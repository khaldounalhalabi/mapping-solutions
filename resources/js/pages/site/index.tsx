import HomeHero from "@/components/site/home/home-hero";
import ProductTechnology from "@/models/product-technology";
import SpectrumLine from "@/components/ui/spectrum-line";
import MarketApplication from "@/models/market-application";
import ApplicationsSection from "@/components/site/home/applications-section";
import NewsSection from "@/components/site/home/news-section";
import NewsArticle from "@/models/news-article";
import Supplier from "@/models/supplier";
import SuppliersSection from "@/components/site/home/suppliers-section";

const Index = ({
    technologies,
    applications,
    news,
    suppliers,
}: {
    technologies: ProductTechnology[];
    applications: MarketApplication[];
    news:         NewsArticle[];
    suppliers:    Supplier[];
}) => {
    return (
        <div className={"py-5"}>
            <HomeHero technologies={technologies} />
            <SpectrumLine className={"my-10"} />
            <ApplicationsSection applications={applications} />
            <NewsSection news={news} />
            <SuppliersSection suppliers={suppliers} />
        </div>
    );
};

export default Index;
