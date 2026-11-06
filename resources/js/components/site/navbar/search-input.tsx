import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

// TODO: implement this search
const SearchInput = () => {
    return (
        <div
            className={
                "flex w-full min-w-0 shrink-0 items-center min-[1101px]:w-64"
            }
        >
            <Input
                className={
                    "min-w-0 h-10 rounded-sm rounded-r-none border-r-0 py-2"
                }
                aria-label="Search"
                placeholder={"Search..."}
            />
            <Button
                size={"icon-lg"}
                variant={"navy"}
                aria-label="Search"
                className={"size-10 shrink-0 rounded-l-none"}
            >
                <SearchIcon className={"size-3.5 stroke-4"} />
            </Button>
        </div>
    );
};

export default SearchInput;
