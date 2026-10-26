import { GlobeIcon } from "lucide-react";

const AddressSection = () => {
    return (
        <div
            className={"flex flex-col items-start justify-between h-full gap-3"}
        >
            <div className={"flex items-center gap-2"}>
                <GlobeIcon className={"text-white"} />
                <h1 className={"text-white text-lg font-extrabold"}>
                    Mapping Solutions Ltd
                </h1>
            </div>
            {/*Implement this open a google map location*/}
            <a href={"#"}>
                <p className={"text-white/60 text-sm"}>
                    69 Hamilton Road, Manchester,
                </p>
                <p className={"text-white/60 text-sm"}> M13 0PD, UK</p>
            </a>
            {/*TODO: settings API*/}
            <a href={"tel:+44 8251 99303 "} className={"text-white/60 text-sm"}>
                Tel: +44 8251 99303
            </a>
            <div className={"flex items-center justify-between gap-2"}>
                {/*TODO: fix this link*/}
                <a
                    className={"text-danger hover:text-white text-xs font-bold"}
                    href={"#"}
                >
                    Sitemap
                </a>
                {/*TODO: fix this link*/}
                <a
                    className={"text-danger hover:text-white text-xs font-bold"}
                    href={"#"}
                >
                    Privacy
                </a>
                {/*TODO: fix this link*/}
                <a
                    className={"text-danger hover:text-white text-xs font-bold"}
                    href={"#"}
                >
                    Terms
                </a>
            </div>
        </div>
    );
};

export default AddressSection;
