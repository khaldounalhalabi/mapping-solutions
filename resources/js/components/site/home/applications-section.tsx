import MarketApplication from "@/models/market-application";
import SectionKicker from "@/components/ui/section-kicker";
import SectionTitle from "@/components/ui/section-title";
import SectionDescription from "@/components/ui/section-description";
import { Link } from "@inertiajs/react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Button } from "@/components/ui/button";
import { translate } from "@/models/translatable";
import MoveLink from "@/components/ui/move-link";

const ApplicationsSection = ({
    applications,
}: {
    applications: MarketApplication[];
}) => {
    return (
        <div className={"flex flex-col items-start px-page-padding"}>
            <SectionKicker>applications</SectionKicker>
            <SectionTitle>
                Applications across research, industry and defence
            </SectionTitle>
            <SectionDescription className={"my-5"}>
                Specify what must be detected, over what area and to what
                accuracy, and our engineers will identify the systems suited to
                the requirement.
            </SectionDescription>
            {/*TODO: fix this link*/}
            <MoveLink href={"#"}>View all applications</MoveLink>
            <div
                className={"my-5 grid grid-cols-2 md:grid-cols-4 w-full gap-5"}
            >
                {applications
                    .filter((a) => a.is_featured)
                    .map((a) => (
                        // TODO: fix this link
                        <Link
                            href={"#"}
                            key={a.id}
                            className={`flex flex-col h-full gap-3 rounded-md border border-gray-200 px-6 py-8 transition-all hover:-translate-y-0.5 hover:border-t-3 hover:border-t-(--theme-color) hover:shadow-2xl`}
                            style={{
                                /*@ts-ignore*/
                                "--theme-color": a.theme_color,
                            }}
                        >
                            <Button
                                variant={"outline"}
                                size={"icon-lg"}
                                className={
                                    "p-5 border-transparent hover:bg-(--theme-color)/20 bg-(--theme-color)/20"
                                }
                                style={{
                                    color:           a.theme_color,
                                    /*@ts-ignore*/
                                    "--theme-color": a.theme_color,
                                }}
                            >
                                <DynamicIcon
                                    name={a.icon_key}
                                    className={"size-5"}
                                />
                            </Button>
                            <div className={"flex flex-col items-start gap-2"}>
                                <h2
                                    className={
                                        "font-extrabold text-shadow-md text-sm text-navy"
                                    }
                                >
                                    {translate(a.name)}
                                </h2>
                                <p className={"text-xs text-paragraph"}>
                                    {translate(a.summary)}
                                </p>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default ApplicationsSection;
