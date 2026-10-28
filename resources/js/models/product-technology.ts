import Product from "@/models/product";
import Media from "@/models/media";
import { IconName } from "lucide-react/dynamic";
import Supplier from "@/models/supplier";

interface ProductTechnology {
    id:               number;
    name:             string;
    slug:             string;
    color:            string;
    icon_key?:        IconName;
    icon?:            Media | undefined;
    products?:        Product[];
    suppliers_count?: number;
    products_count?:  number;
    suppliers?:       Supplier[];
}

export default ProductTechnology;
