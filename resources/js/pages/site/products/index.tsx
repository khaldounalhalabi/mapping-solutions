import IndexHeroSection from "@/components/site/products/index-hero-section";
import ProductTechnology from "@/models/product-technology";
import ProductTechnologiesGrid from "@/components/site/home/product-technologies-grid";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

const Index = ({ technologies }: { technologies: ProductTechnology[] }) => {
    return (
        <>
            <IndexHeroSection />
            <div className={"px-page-padding py-18"}>
                <ProductTechnologiesGrid technologies={technologies} />
                <div
                    className={
                        "my-10 w-full flex items-center justify-between bg-navy-secondary/20 px-5 py-5 rounded-lg border border-navy-secondary/20 border-s-4 border-s-navy-secondary"
                    }
                >
                    <div
                        className={"flex flex-col gap-3 items-start max-w-1/2"}
                    >
                        <h1 className={"font-extrabold text-navy-secondary"}>
                            Not sure where to start ?
                        </h1>
                        <p className={"text-sm text-paragraph"}>
                            Tell us what you need to measure, over what area, to
                            what accuracy. We'll shortlist the instruments that
                            fit.
                        </p>
                    </div>
                    {/*TODO: configure this link*/}
                    <Link>
                        <Button variant={"navy-secondary"} size={"hero"}>
                            Send us your requirement
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Index;
