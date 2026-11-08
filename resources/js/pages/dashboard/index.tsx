import { translateKey } from "@/hooks/use-translation";
const Index = () => {
    return (
        <div>
            <h1 className="text-5xl dark:text-white">
                {" "}
                {translateKey("dashboard.welcome")}{" "}
            </h1>
        </div>
    );
};

export default Index;
