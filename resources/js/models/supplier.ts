import ProductFamily from "@/models/product-family";
import Media from "@/models/media";
interface Supplier {
    id: number;
    name: string;
    slug: string;
    description: string;
    logo?: Media | undefined;
    product_families?: ProductFamily[];
}

export default Supplier;
