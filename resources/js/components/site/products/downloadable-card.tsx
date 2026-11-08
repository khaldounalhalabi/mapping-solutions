import { translateKey } from "@/hooks/use-translation";
import { FileTextIcon } from "lucide-react";
import Media from "@/models/media";
import MoveLink from "@/components/ui/move-link";

const DownloadableCard = ({ name, media }: { name: string; media: Media }) => {
    return (
        <a
            className={
                "flex flex-wrap min-w-0 items-center gap-3 p-5 border rounded-lg group transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-navy-secondary/50 hover:border-navy-secondary"
            }
            download
            href={media.url}
        >
            <div
                className={
                    "p-3 rounded-md bg-navy-secondary/15 text-navy-secondary font-extrabold [a]:hover:bg-navy-secondary/25"
                }
            >
                <FileTextIcon className={"size-4"} />
            </div>

            <div className={"flex flex-col gap-1"}>
                <h3 className={"font-bold text-sm text-navy"}>{name}</h3>
                <p className={"text-paragraph text-xs"}>
                    {" "}
                    {translateKey(
                        "site.copy.full_specifications_for_engineers",
                    )}{" "}
                    {media.extension}
                </p>
            </div>

            <MoveLink className={"text-navy-secondary font-extrabold"}>
                {" "}
                {translateKey("site.copy.download")}{" "}
            </MoveLink>
        </a>
    );
};

export default DownloadableCard;
