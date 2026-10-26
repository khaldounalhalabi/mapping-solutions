import MarketApplication from "@/models/market-application";
import SectionKicker from "@/components/ui/section-kicker";
import SectionTitle from "@/components/ui/section-title";
import SectionDescription from "@/components/ui/section-description";
import { Link } from "@inertiajs/react";
import { MoveRightIcon } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Button } from "@/components/ui/button";
import { translate } from "@/models/translatable";

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
            <Link
                className={
                    "font-bold text-xs text-danger flex flex-1 gap-1 hover:gap-2 transition-all items-center"
                }
                href={"#"}
            >
                View all applications
                <MoveRightIcon className={"size-2"} />
            </Link>
            <div
                className={"my-5 grid grid-cols-2 md:grid-cols-4 w-full gap-5"}
            >
                {applications
                    .filter((a) => a.is_featured)
                    .map((a) => (
                        <div
                            className={
                                "flex flex-col gap-3 border border-gray-200 rounded-md py-8 px-6 hover:-translate-y-1 hover:shadow-2xl transition-all hover:before:opacity-10 hover:border-t-2 hover:border-t-red-400"
                            }
                        >
                            <Button
                                variant={"outline"}
                                size={"icon-lg"}
                                className={"p-4"}
                            >
                                <DynamicIcon name={a.icon_key} />
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
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ApplicationsSection;
