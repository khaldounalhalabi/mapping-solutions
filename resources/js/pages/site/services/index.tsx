import SpectrumLine from "@/components/ui/spectrum-line";
import { randomInt } from "@/helper";
import { translate } from "@/models/translatable";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "lucide-react/dynamic";
import ServiceCategory from "@/models/service-category";
import MoveLink from "@/components/ui/move-link";

const colors = ["navy-secondary", "green", "purple", "red"] as const;

const Index = ({ categories }: { categories: ServiceCategory[] }) => {
    const groupColors = categories.map((c, index) => {
        let color;
        if (colors?.[index] != null) {
            color = colors[index];
        } else {
            color = colors[randomInt(0, 3)];
        }
        return {
            groupId: c.id,
            color,
        };
    });

    const getGroupColor = (groupId: number) => {
        const color = groupColors.find((g) => g.groupId == groupId);

        switch (color?.color) {
            case "navy-secondary":
                return {
                    bg:             "bg-navy-secondary",
                    border:         "hover:inset-shadow-[0_-1px_0_0_var(--navy-secondary)]",
                    iconBg:         "bg-navy-secondary/20",
                    text:           "text-navy-secondary",
                    service_border:
                        "hover:inset-shadow-[0_3px_0_0_var(--navy-secondary)]",
                };
            case "green":
                return {
                    bg:             "bg-green-800",
                    border:         "hover:inset-shadow-[0_-1px_0_0_var(--color-green-800)]",
                    iconBg:         "bg-green-800/20",
                    text:           "text-green-800",
                    service_border:
                        "hover:inset-shadow-[0_3px_0_0_var(--color-green-800)]",
                };
            case "purple": {
                return {
                    bg:             "bg-purple-800",
                    border:         "hover:inset-shadow-[0_-1px_0_0_var(--color-purple-800)]",
                    iconBg:         "bg-purple-800/20",
                    text:           "text-purple-800",
                    service_border:
                        "hover:inset-shadow-[0_3px_0_0_var(--color-purple-800)]",
                };
            }
            case "red": {
                return {
                    bg:             "bg-red-800",
                    border:         "hover:inset-shadow-[0_-1px_0_0_var(--color-red-800)]",
                    iconBg:         "bg-red-800/20",
                    text:           "text-red-800",
                    service_border:
                        "hover:inset-shadow-[0_3px_0_0_var(--color-red-800)]",
                };
            }
            default:
                return {
                    bg:             "bg-navy-secondary",
                    border:         "hover:inset-shadow-[0_-1px_0_0_var(--navy-secondary)]",
                    iconBg:         "bg-navy-secondary/20",
                    text:           "text-navy-secondary",
                    service_border:
                        "hover:inset-shadow-[0_3px_0_0_var(--navy-secondary)]",
                };
        }
    };

    return (
        <div>
            <section
                className={
                    "relative flex h-full bg-hero flex-col items-start px-48 py-10 gap-5"
                }
            >
                <SpectrumLine className={"w-16 h-1"} />
                <h2
                    className={
                        "text-navy-hero uppercase font-extrabold text-xs starting:translate-y-5 starting:opacity-0 translate-0 opacity-100 transition-all duration-700 ease-out"
                    }
                >
                    Services · since 2004
                </h2>
                <h1
                    className={
                        "text-4xl text-white font-extrabold starting:translate-y-6 starting:opacity-0 translate-0 opacity-100 transition-all duration-800 ease-out"
                    }
                >
                    We don't just sell the instruments — we fly them
                </h1>
                <p
                    className={
                        "text-xs text-white/80 max-w-1/2 starting:translate-y-7 starting:opacity-0 translate-0 opacity-100 transition-all duration-900 ease-out"
                    }
                >
                    Full airborne survey campaigns, data processing and GIS,
                    independent technical consultancy and hands-on training. The
                    same engineers who support our customers' instruments run
                    the surveys themselves.
                </p>
            </section>
            <div
                className={
                    "w-full flex items-center shadow-xl gap-8 px-page-padding py-3"
                }
            >
                {categories.map((c) => {
                    const groupColor = getGroupColor(c.id);
                    return (
                        <a
                            className={`flex items-center font-bold text-sm transition-shadow duration-200 text-navy ${groupColor.border}`}
                        >
                            <Button
                                variant={"link"}
                                className={"hover:no-underline"}
                            >
                                <span
                                    className={`inline-block size-2 rounded-full ${groupColor.bg}`}
                                />
                                <span>{translate(c.name)}</span>
                            </Button>
                        </a>
                    );
                })}
            </div>
            <div className={"w-full px-page-padding"}>
                <div className={"py-10 space-y-16"}>
                    {categories.map((c) => {
                        const color = getGroupColor(c.id);
                        return (
                            <div
                                className={"flex flex-col items-start gap-5"}
                                id={`service-group-${translate(c.name)}`}
                            >
                                <div className={"flex items-center gap-1"}>
                                    <div
                                        className={`flex items-center justify-center size-7 rounded-md ${color.iconBg}`}
                                    >
                                        <DynamicIcon
                                            name={c.icon_key}
                                            className={`${color.text} size-4`}
                                        />
                                    </div>
                                    <span
                                        className={`text-xs font-extrabold uppercase ${color.text}`}
                                    >
                                        {translate(c.name)}
                                    </span>
                                </div>
                                <h2
                                    className={
                                        "text-3xl font-extrabold text-navy"
                                    }
                                >
                                    {translate(c.title)}
                                </h2>
                                <p
                                    className={
                                        "text-paragraph text-sm font-bold max-w-2/3"
                                    }
                                >
                                    {translate(c.excerpt)}
                                </p>
                                <div
                                    className={
                                        "grid grid-cols-2 md:grid-cols-3 gap-5"
                                    }
                                >
                                    {c.services?.map((s, index) => (
                                        <div
                                            key={index}
                                            className={`${color.service_border} gap-5 transition-all hover:-translate-y-0.5 hover:shadow-2xl border rounded-lg flex flex-col items-start justify-between h-full p-8`}
                                        >
                                            <div className={"space-y-2"}>
                                                <h3
                                                    className={
                                                        "text-navy font-extrabold"
                                                    }
                                                >
                                                    {translate(s.name)}
                                                </h3>
                                                <p
                                                    className={
                                                        "text-paragraph text-sm text-wrap"
                                                    }
                                                >
                                                    {translate(s.summary)}
                                                </p>
                                            </div>
                                            <MoveLink href={"#"}>
                                                Request a quote
                                            </MoveLink>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                className={
                    "w-full py-24 px-52 flex flex-col items-center justify-center bg-brand gap-5"
                }
            >
                <h2
                    className={"text-4xl font-extrabold text-center text-white"}
                >
                    Got a survey to plan?
                </h2>
                <p className={"text-white/60 text-sm text-center md:max-w-1/2"}>
                    Tell us the area, the target and the accuracy you need —
                    we'll tell you what's achievable, what it takes, and whether
                    flying it is even the right answer.
                </p>
                <Button variant={"hero"} size={"hero"}>
                    Contact our technical team
                </Button>
            </div>
            <SpectrumLine />
        </div>
    );
};

export default Index;
