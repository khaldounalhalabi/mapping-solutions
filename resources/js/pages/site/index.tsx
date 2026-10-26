import HomeHero from "@/components/site/home/home-hero";
import ProductTechnology from "@/models/product-technology";
import SpectrumLine from "@/components/ui/spectrum-line";
import MarketApplication from "@/models/market-application";
import ApplicationsSection from "@/components/site/home/applications-section";
import NewsSection from "@/components/site/home/news-section";
import NewsArticle from "@/models/news-article";

const Index = ({
    technologies,
    applications,
    news,
}: {
    technologies: ProductTechnology[];
    applications: MarketApplication[];
    news:         NewsArticle[];
}) => {
    return (
        <div className={"py-5"}>
            <HomeHero technologies={technologies} />
            <SpectrumLine className={"my-10"} />
            <ApplicationsSection applications={applications} />
            <NewsSection news={news} />
        </div>
    );
};

export default Index;
