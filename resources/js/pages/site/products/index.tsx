import { translateKey } from "@/hooks/use-translation";
import IndexHeroSection from "@/components/site/products/index-hero-section";
import ProductTechnology from "@/models/product-technology";
import ProductTechnologiesGrid from "@/components/site/product-technologies/product-technologies-grid";
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
                        "my-10 w-full flex flex-col items-start gap-5 lg:flex-row lg:items-center justify-between bg-navy-secondary/20 px-5 py-5 rounded-lg border border-navy-secondary/20 border-s-4 border-s-navy-secondary"
                    }
                >
                    <div
                        className={
                            "flex flex-col gap-3 items-start max-w-full lg:max-w-1/2"
                        }
                    >
                        <h1 className={"font-extrabold text-navy-secondary"}>
                            {" "}
                            {translateKey(
                                "site.copy.not_sure_where_to_start",
                            )}{" "}
                        </h1>
                        <p className={"text-sm text-paragraph"}>
                            {" "}
                            {translateKey(
                                "site.copy.tell_us_what_you_need_to_measure_over_what_area_to_what_accuracy_we_ll_shortlist_the_instr",
                            )}{" "}
                        </p>
                    </div>
                    <Link href={route("site.contact")}>
                        <Button variant={"navy-secondary"} size={"hero"}>
                            {" "}
                            {translateKey(
                                "site.copy.send_us_your_requirement",
                            )}{" "}
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Index;
