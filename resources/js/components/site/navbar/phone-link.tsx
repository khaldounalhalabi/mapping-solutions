import { PhoneIcon } from "lucide-react";

const PhoneLink = () => {
    return (
        <a
            href={"tel:+44 8251 99303"}
            className={"flex items-center gap-2 hover:text-link"}
        >
            <PhoneIcon className={"text-success"} />
            {/*TODO: settings API*/}
            <p className={"font-extrabold text-xl"}>+44 8251 99303</p>
        </a>
    );
};

export default PhoneLink;
