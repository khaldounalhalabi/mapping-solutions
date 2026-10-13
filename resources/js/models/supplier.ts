import Media from "@/models/media";
interface Supplier {
    id: number;
    name: string;
    slug: string;
    description: string;
    logo?: Media | undefined;
}

export default Supplier;
