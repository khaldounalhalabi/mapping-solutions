import { IconName } from "lucide-react/dynamic";
import Service from "@/models/service";

interface ServiceCategory {
    id:        number;
    name:      string;
    title:     string;
    excerpt:   string;
    icon_key:  IconName;
    services?: Service[];
}

export default ServiceCategory;
