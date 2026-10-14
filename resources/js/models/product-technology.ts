import Media from "@/models/media";
interface ProductTechnology {
    id: number;
    name: string;
    slug: string;
    icon_key?: string;
    icon?: Media | undefined;
}

export default ProductTechnology;
