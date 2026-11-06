import { FileTextIcon } from "lucide-react";
import Media from "@/models/media";
import MoveLink from "@/components/ui/move-link";

const DownloadableCard = ({ name, media }: { name: string; media: Media }) => {
    return (
        <a
            className={
                "flex items-center gap-3 p-5 border rounded-lg group transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-wash/50 hover:border-wash"
            }
            download
            href={media.url}
        >
            <div
                className={
                    "p-3 rounded-md bg-wash/15 text-wash font-extrabold [a]:hover:bg-wash/25"
                }
            >
                <FileTextIcon className={"size-4"} />
            </div>

            <div className={"flex flex-col gap-1"}>
                <h3 className={"font-bold text-sm text-navy"}>{name}</h3>
                <p className={"text-paragraph text-xs"}>
                    Full Specifications for Engineers - {media.extension}
                </p>
            </div>

            <MoveLink className={"text-wash font-extrabold"}>Download</MoveLink>
        </a>
    );
};

export default DownloadableCard;
