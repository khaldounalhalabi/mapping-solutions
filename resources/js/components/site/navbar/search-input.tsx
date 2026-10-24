import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

// TODO: implement this search
const SearchInput = () => {
    return (
        <div className={"flex items-center"}>
            <Input
                className={"rounded-sm rounded-r-none py-5"}
                placeholder={"Search..."}
            />
            <Button
                size={"icon-lg"}
                variant={"navy"}
                className={"rounded-l-none p-5"}
            >
                <SearchIcon className={"size-3.5 stroke-4"} />
            </Button>
        </div>
    );
};

export default SearchInput;
