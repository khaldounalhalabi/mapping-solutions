import { IconName } from "lucide-react/dynamic";

interface Service {
    id:         number;
    group:      string;
    group_icon: IconName;
    name:       string;
    summary:    string;
}

export default Service;
