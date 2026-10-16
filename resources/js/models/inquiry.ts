import Product from "@/models/product";
interface Inquiry {
    id:          number;
    product_id?: number;
    first_name:  string;
    last_name:   string;
    company:     string;
    country:     string;
    email:       string;
    phone:       string;
    subject:     string;
    message:     string;
    product?:    Product;
}

export default Inquiry;
