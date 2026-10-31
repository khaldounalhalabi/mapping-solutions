// TODO: Replace with values from settings
import AnimatedCounter from "@/components/ui/animated-counter";
import { useMemo } from "react";
import useSettings from "@/hooks/use-settings";
import SettingKeyEnum from "@/enums/setting-key-enum";

const HeroCounts = () => {
    const { valueOf } = useSettings();
    const years =
        new Date().getFullYear() - (valueOf(SettingKeyEnum.START_YEAR) ?? 0);
    const heroStats = useMemo(
        () => [
            {
                value:       years,
                suffix:      "+",
                description:
                    "Years supplying remote sensing instrumentation to research, defence and industry",
            },
            {
                value:       9,
                description:
                    "Manufacturers represented, with factory-level technical support",
            },
            {
                value:       24,
                description:
                    "Instruments listed, each with complete specifications",
            },
        ],
        [],
    );
    return (
        <div className="grid grid-cols-3 w-full items-start gap-10 justify-between">
            {heroStats.map((stat, index) => (
                <div key={index} className="flex items-start flex-col">
                    <h1 className="text-4xl font-extrabold text-navy">
                        <AnimatedCounter
                            value={stat.value}
                            suffix={stat.suffix}
                            duration={1800}
                        />
                    </h1>

                    <p className="text-xs text-paragraph text-start">
                        {stat.description}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default HeroCounts;
