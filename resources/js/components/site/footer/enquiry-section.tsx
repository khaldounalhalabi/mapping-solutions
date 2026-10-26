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
                    Enquiry Form
                </h1>
            </div>
            <div>
                <p className={"text-white/60 text-sm"}>
                    Join our mailing list for new instruments, application
                    notes, events and training workshops.
                </p>
            </div>
            {/*TODO: implement this*/}
            <div className={"flex items-center"}>
                <MoveLink href={"#"} className={"hover:text-white"}>
                    Make an enquiry
                </MoveLink>
            </div>
        </div>
    );
};

export default EnquirySection;
