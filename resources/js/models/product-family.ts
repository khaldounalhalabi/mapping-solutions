import Product from "@/models/product";
import Supplier from "@/models/supplier";
interface ProductFamily {
    id:          number;
    supplier_id: number;
    name:        string;
    slug:        string;
    supplier?:   Supplier;
    products?:   Product[];
}

export default ProductFamily;
