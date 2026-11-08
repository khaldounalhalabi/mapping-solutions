import { translateKey } from "@/hooks/use-translation";
import { PencilLineIcon } from "lucide-react";
import MoveLink from "@/components/ui/move-link";

const EnquirySection = () => {
    return (
        <div
            className={"flex flex-col items-start justify-between h-full gap-3"}
        >
            <div className={"flex items-center gap-2"}>
                <PencilLineIcon className={"text-white"} />
                <h1 className={"text-white text-lg font-extrabold"}>
                    {" "}
                    {translateKey("site.copy.enquiry_form")}{" "}
                </h1>
            </div>
            <div>
                <p className={"text-white/60 text-sm"}>
                    {" "}
                    {translateKey(
                        "site.copy.join_our_mailing_list_for_new_instruments_application_notes_events_and_training_workshops",
                    )}{" "}
                </p>
            </div>

            <div className={"flex items-center"}>
                <MoveLink
                    href={route("site.contact")}
                    className={"hover:text-white"}
                >
                    {" "}
                    {translateKey("site.copy.make_an_enquiry")}{" "}
                </MoveLink>
            </div>
        </div>
    );
};

export default EnquirySection;
