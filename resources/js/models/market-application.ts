import { IconName } from "lucide-react/dynamic";

interface MarketApplication {
    id:          number;
    name:        string;
    icon_key:    IconName;
    theme_color: string;
    summary:     string;
    description: string;
    is_featured: boolean;
}

export default MarketApplication;
