import Inquiry from "@/models/inquiry";
import ProductTechnology from "@/models/product-technology";
import ProductFamily from "@/models/product-family";
import Supplier from "@/models/supplier";
import Media from "@/models/media";
interface Product {
    id:                     number;
    supplier_id:            number;
    product_family_id?:     number;
    product_technology_id?: number;
    name:                   string;
    price_note?:            string;
    slug:                   string;
    excerpt?:               string;
    overview?:              string;
    key_specs?:             string;
    specifications?:        string;
    applications?:          string;
    external_url?:          string;
    hero_image?:            Media | undefined;
    specifications_file?:   Media | undefined;
    datasheet?:             Media | undefined;
    manual?:                Media | undefined;
    brochure?:              Media | undefined;
    supplier?:              Supplier;
    product_family?:        ProductFamily;
    product_technology?:    ProductTechnology;
    inquiries?:             Inquiry[];
}

export default Product;
