import { translateKey } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { siteRoute } from "@/lib/site-route";

const ContactSection = () => {
    return (
        <div
            className={
                "px-page-padding py-14 mt-12 bg-brand flex items-center justify-center"
            }
        >
            <div className={"flex flex-col items-center gap-6"}>
                <h2 className={"text-white font-bold text-4xl"}>
                    {" "}
                    {translateKey(
                        "site.copy.technical_guidance_on_instrument_selection",
                    )}{" "}
                </h2>
                <p className={"text-white/60 text-sm text-center md:max-w-1/2"}>
                    {" "}
                    {translateKey(
                        "site.copy.provide_the_measurement_requirement_the_area_to_be_covered_and_the_accuracy_required_and_o",
                    )}{" "}
                </p>
                <Link href={siteRoute("site.contact")}>
                    <Button variant={"hero"} size={"hero"}>
                        {" "}
                        {translateKey(
                            "site.copy.contact_our_technical_team",
                        )}{" "}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ContactSection;
