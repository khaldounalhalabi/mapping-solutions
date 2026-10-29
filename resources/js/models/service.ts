import ServiceCategory from "@/models/service-category";

interface Service {
    id:                  number;
    service_category_id: number;
    service_category?:   ServiceCategory;
    name:                string;
    summary:             string;
}

export default Service;
