import SpectrumLine from "@/components/ui/spectrum-line";
import CatalogueSearch from "@/components/site/products/catalogue-search";
import { useTranslation } from "@/hooks/use-translation";

const IndexHeroSection = () => {
    const { t } = useTranslation();
    return (
        <section
            className={
                "relative flex h-full bg-hero flex-col items-start px-5 sm:px-10 lg:px-16 xl:px-48 py-10 gap-5"
            }
        >
            <SpectrumLine className={"w-16 h-1"} />
            <h2
                className={
                    "text-navy-hero uppercase font-extrabold text-xs starting:translate-y-5 starting:opacity-0 translate-0 opacity-100 transition-all duration-700 ease-out"
                }
            >
                product catalogue
            </h2>
            <h1
                className={
                    "text-4xl text-white font-extrabold starting:translate-y-6 starting:opacity-0 translate-0 opacity-100 transition-all duration-800 ease-out"
                }
            >
                Instruments for measurement beyond the visible spectrum
            </h1>
            <p
                className={
                    "text-xs text-white/80 max-w-full lg:max-w-1/2 starting:translate-y-7 starting:opacity-0 translate-0 opacity-100 transition-all duration-900 ease-out"
                }
            >
                Browse by what you need to measure. Every instrument comes with
                UK technical support and training.
            </p>
            <div
                className={
                    "w-full max-w-2xl lg:absolute lg:-bottom-15 flex flex-col gap-4 items-start"
                }
            >
                <CatalogueSearch />

                <p className={"text-paragraph text-xs"}>
                    {t("site.catalogue.search_hint")}
                </p>
            </div>
        </section>
    );
};

export default IndexHeroSection;
