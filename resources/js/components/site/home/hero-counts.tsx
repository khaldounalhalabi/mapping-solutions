import { useTranslation } from "@/hooks/use-translation";
import AnimatedCounter from "@/components/ui/animated-counter";
import { useMemo } from "react";
import useSettings from "@/hooks/use-settings";
import SettingKeyEnum from "@/enums/setting-key-enum";
import { usePage } from "@inertiajs/react";

const HeroCounts = () => {
    const { t } = useTranslation();
    const { valueOf } = useSettings();
    const years =
        new Date().getFullYear() - (valueOf(SettingKeyEnum.START_YEAR) ?? 0);
    const {
        props: { suppliers_count, products_count },
    } = usePage();
    const heroStats = useMemo(
        () => [
            {
                value:       years,
                suffix:      "+",
                description: t("site.home.years"),
            },
            {
                value:       suppliers_count,
                description: t("site.home.manufacturers"),
            },
            {
                value:       products_count,
                description: t("site.home.instruments"),
            },
        ],
        [years, suppliers_count, products_count, t],
    );
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full items-start gap-10 justify-between">
            {heroStats.map((stat, index) => (
                <div key={index} className="flex items-start flex-col">
                    <p className="text-4xl font-extrabold text-navy">
                        <AnimatedCounter
                            value={stat.value}
                            suffix={stat.suffix}
                            duration={1800}
                        />
                    </p>

                    <p className="text-xs text-paragraph text-start">
                        {stat.description}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default HeroCounts;
