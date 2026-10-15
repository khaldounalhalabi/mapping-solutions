import { IconName } from "lucide-react/dynamic";

interface MarketApplication {
    id:          number;
    name:        string;
    icon_key:    IconName;
    summary:     string;
    description: string;
}

export default MarketApplication;
