import SpectrumLine from "@/components/ui/spectrum-line";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const IndexHeroSection = () => {
    return (
        <section
            className={
                "relative flex h-full bg-hero flex-col items-start px-48 py-10 gap-5"
            }
        >
            <SpectrumLine className={"w-16 h-1"} />
            <h2 className={"text-navy-hero uppercase font-extrabold text-xs"}>
                product catalogue
            </h2>
            <h1 className={"text-4xl text-white font-extrabold"}>
                Instruments for measurement beyond the visible spectrum
            </h1>
            <p className={"text-xs text-white/80 max-w-1/2"}>
                Browse by what you need to measure. Every instrument comes with
                UK technical support and training.
            </p>
            <div
                className={
                    "absolute z-10 -bottom-15 flex flex-col gap-4 items-start"
                }
            >
                <div className={"relative"}>
                    <SearchIcon
                        className={
                            "absolute top-3.5 inset-s-2 size-4.5 text-navy-secondary stroke-3"
                        }
                    />
                    <Input
                        className={"bg-white w-2xl py-6 shadow-xl px-10"}
                        placeholder={"Search products and suppliers"}
                    />
                </div>

                <p className={"text-paragraph text-xs"}>
                    Try a product name, model number, or manufacturer — results
                    appear as you type.
                </p>
            </div>
        </section>
    );
};

export default IndexHeroSection;
