import IsoCheckIcon from "@/components/site/icons/ISOCheckIcon";

const IsoCertifiedSection = () => {
    return (
        <div className={"flex flex-col items-center h-full gap-5"}>
            <div className={"flex items-center gap-2"}>
                <div
                    className={
                        "flex items-center border rounded-md px-5 py-3 gap-5 bg-white w-full h-20"
                    }
                >
                    <IsoCheckIcon className={"size-10"} />
                    <div className={"flex flex-col items-start"}>
                        <strong className={"font-extrabold text-xl"}>
                            ISO 9001
                        </strong>
                        <p
                            className={
                                "text-navy font-bold text-[0.6rem] uppercase tracking-wider"
                            }
                        >
                            Certified · Quality
                        </p>
                        <p
                            className={
                                "text-navy font-bold text-[0.6rem] uppercase tracking-wider"
                            }
                        >
                            Management
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <p className={"text-white text-sm font-bold text-center"}>
                    Mapping Solutions © 2026. All rights reserved
                </p>
            </div>
        </div>
    );
};

export default IsoCertifiedSection;
