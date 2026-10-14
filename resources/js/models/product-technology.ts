import Media from "@/models/media";
import { IconName } from "lucide-react/dynamic";

interface ProductTechnology {
    id: number;
    name: string;
    slug: string;
    icon_key?: IconName;
    icon?: Media | undefined;
}

export default ProductTechnology;
