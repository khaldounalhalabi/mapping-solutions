import IsoCheckIcon from "@/components/site/icons/ISOCheckIcon";

const IsoWidget = () => {
    return (
        <div
            className={
                "flex items-center border rounded-md px-3 py-1 gap-2 hover:border-gray-300 hover:shadow-sm"
            }
        >
            <IsoCheckIcon />
            <div className={"flex flex-col items-start"}>
                <strong className={"font-extrabold text-sm"}>ISO 901</strong>
                <p
                    className={
                        "text-gray-500 text-[0.6rem] uppercase tracking-wider"
                    }
                >
                    certified
                </p>
            </div>
        </div>
    );
};

export default IsoWidget;
