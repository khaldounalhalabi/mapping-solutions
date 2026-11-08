import { useTranslation } from "@/hooks/use-translation";
import SpectrumLine from "@/components/ui/spectrum-line";
import ProductTechnologiesGrid from "@/components/site/product-technologies/product-technologies-grid";
import ProductTechnology from "@/models/product-technology";
import { Separator } from "@/components/ui/separator";
import HeroCounts from "@/components/site/home/hero-counts";
import SectionTitle from "@/components/ui/section-title";
import SectionDescription from "@/components/ui/section-description";

const HomeHero = ({ technologies }: { technologies: ProductTechnology[] }) => {
    const { t } = useTranslation();
    return (
        <div className={"flex flex-col items-start px-page-padding"}>
            <SectionTitle>{t("site.home.heading")}</SectionTitle>
            <SpectrumLine className={"h-0.5 my-5"} />
            <SectionDescription>{t("site.home.intro")}</SectionDescription>
            <ProductTechnologiesGrid technologies={technologies} />
            <Separator className={"my-10"} />
            <HeroCounts />
        </div>
    );
};

export default HomeHero;
