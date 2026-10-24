import Product from "@/models/product";
import Media from "@/models/media";
import { IconName } from "lucide-react/dynamic";

interface ProductTechnology {
    id:        number;
    name:      string;
    slug:      string;
    color:     string | null;
    icon_key?: IconName;
    icon?:     Media | undefined;
    products?: Product[];
}

export default ProductTechnology;
