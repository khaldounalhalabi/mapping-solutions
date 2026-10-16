import Product from "@/models/product";
import User from "@/models/user";
interface Inquiry {
    id:                number;
    product_id?:       number;
    first_name:        string;
    last_name:         string;
    company:           string;
    country:           string;
    email:             string;
    phone:             string;
    subject:           string;
    message:           string;
    product?:          Product;
    response_subject?: string | null;
    response_message?: string | null;
    responded_at?:     string | null;
    responded_by?:     User | null;
}

export default Inquiry;
