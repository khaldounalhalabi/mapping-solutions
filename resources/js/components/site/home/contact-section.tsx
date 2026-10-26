import { Button } from "@/components/ui/button";

const ContactSection = () => {
    return (
        <div
            className={
                "px-page-padding py-14 mt-12 bg-brand flex items-center justify-center"
            }
        >
            <div className={"flex flex-col items-center gap-6"}>
                <h1 className={"text-white font-bold text-4xl"}>
                    Technical guidance on instrument selection
                </h1>
                <p className={"text-white/60 text-sm text-center md:max-w-1/2"}>
                    Provide the measurement requirement, the area to be covered
                    and the accuracy required, and our engineers will recommend
                    the most appropriate system for the application.
                </p>
                <Button variant={"hero"} size={"hero"}>
                    Contact our technical team
                </Button>
            </div>
        </div>
    );
};

export default ContactSection;
