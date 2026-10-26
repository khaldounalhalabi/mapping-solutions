import { MailIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa";

const NewsletterSection = () => {
    return (
        <div
            className={"flex flex-col items-start justify-between h-full gap-3"}
        >
            <div className={"flex items-center gap-2"}>
                <MailIcon className={"text-white"} />
                <h1 className={"text-white text-lg font-extrabold"}>
                    Subscribe
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
                <Input
                    className={
                        "rounded-sm rounded-r-none placeholder-gray-500 border-gray-600 border outline-none border-r-0 py-[1.20rem]"
                    }
                    placeholder={"Email Address"}
                />
                <Button
                    size={"icon-lg"}
                    className={"rounded-l-none py-5 px-7 font-extrabold"}
                    variant={"secondary"}
                >
                    Join
                </Button>
            </div>
            <div className={"flex items-center justify-between gap-2"}>
                {/*TODO: fix this link*/}
                <a
                    className={"text-white hover:text-white text-xs font-bold"}
                    href={"#"}
                >
                    <FaLinkedinIn className={"size-5"} />
                </a>

                {/*TODO: fix this link*/}
                <a
                    className={"text-white hover:text-white text-xs font-bold"}
                    href={"#"}
                >
                    <FaYoutube className={"size-5"} />
                </a>

                {/*TODO: fix this link*/}
                <a
                    className={"text-white hover:text-white text-xs font-bold"}
                    href={"#"}
                >
                    <FaFacebook className={"size-5"} />
                </a>

                {/*TODO: fix this link*/}
                <a
                    className={"text-white hover:text-white text-xs font-bold"}
                    href={"#"}
                >
                    <FaInstagram className={"size-5"} />
                </a>
            </div>
        </div>
    );
};

export default NewsletterSection;
