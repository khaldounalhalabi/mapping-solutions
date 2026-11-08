import { translateKey } from "@/hooks/use-translation";
import { GetEditor } from "@/components/form/fields/tiptap/tiptap-buttons";

const TiptapFooter = () => {
    const editor = GetEditor();
    return (
        <div className={"mt-3 flex w-full items-center justify-between"}>
            <div className={"flex items-center gap-2 justify-self-end"}>
                <span>
                    {editor.storage.characterCount.characters()}{" "}
                    {translateKey("site.copy.character")}{" "}
                </span>
                /
                <span>
                    {editor.storage.characterCount.words()}{" "}
                    {translateKey("site.copy.word")}{" "}
                </span>
            </div>
        </div>
    );
};

export default TiptapFooter;
