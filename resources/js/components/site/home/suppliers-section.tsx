import { translateKey } from "@/hooks/use-translation";
import Supplier from "@/models/supplier";
import SectionKicker from "@/components/ui/section-kicker";
import SectionTitle from "@/components/ui/section-title";
import SectionDescription from "@/components/ui/section-description";

const SuppliersSection = ({ suppliers }: { suppliers: Supplier[] }) => {
    return (
        <div
            className={
                "flex flex-col items-start py-20 px-page-padding bg-bg-secondary"
            }
        >
            <SectionKicker>
                {" "}
                {translateKey("site.copy.partnerships")}{" "}
            </SectionKicker>
            <SectionTitle>
                {" "}
                {translateKey("site.copy.manufacturers_represented")}{" "}
            </SectionTitle>
            <SectionDescription className={"my-5"}>
                {" "}
                {translateKey(
                    "site.copy.we_work_directly_with_manufacturers_providing_factory_level_expertise_alongside_uk_based_s",
                )}{" "}
            </SectionDescription>
            <div className="grid w-full grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-5">
                {suppliers.map((s) => (
                    <div
                        key={s.id}
                        className="flex items-center justify-center overflow-hidden rounded-md border border-gray-200 transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                    >
                        <img
                            src={s.logo?.url}
                            alt={s.name + "-logo"}
                            className="h-full w-full object-fill"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuppliersSection;
