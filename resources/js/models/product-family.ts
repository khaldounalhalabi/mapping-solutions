import Supplier from "@/models/supplier";
interface ProductFamily {
    id: number;
    supplier_id: number;
    name: string;
    slug: string;
    supplier?: Supplier;
}

export default ProductFamily;
