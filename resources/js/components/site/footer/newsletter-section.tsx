import { translateKey } from "@/hooks/use-translation";
import usePublicFormProtection from "@/hooks/use-public-form-protection";
import { MailIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa";
import useSettings from "@/hooks/use-settings";
import SettingKeyEnum from "@/enums/setting-key-enum";
import { useForm, usePage } from "@inertiajs/react";
import { FormEvent } from "react";

const NewsletterSection = () => {
    const { valueOf } = useSettings();
    const {
        props: { currentLocale },
    } = usePage();
    const { protect, protectionFields } = usePublicFormProtection();
    const {
        data,
        setData,
        post,
        transform,
        processing,
        errors,
        reset,
        wasSuccessful,
    } = useForm({ email: "" });
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        transform(protect);
        post(route("v1.web.public.newsletter.subscribe"), {
            preserveScroll: true,
            onSuccess:      () => reset(),
        });
    };
    return (
        <div
            className={"flex flex-col items-start justify-between h-full gap-3"}
        >
            <div className={"flex items-center gap-2"}>
                <MailIcon className={"text-white"} />
                <h2 className={"text-white text-lg font-extrabold"}>
                    {" "}
                    {translateKey("site.copy.subscribe")}{" "}
                </h2>
            </div>
            <div>
                <p className={"text-white/60 text-sm"}>
                    {" "}
                    {translateKey(
                        "site.copy.join_our_mailing_list_for_new_instruments_application_notes_events_and_training_workshops",
                    )}{" "}
                </p>
            </div>
            <form onSubmit={submit} className={"w-full"}>
                {protectionFields}
                <div
                    className={`flex w-full min-w-0 items-center ${currentLocale == "ar" ? "flex-row-reverse" : ""}`}
                >
                    <Input
                        type="email"
                        name="email"
                        aria-label={translateKey("site.copy.email_address")}
                        aria-invalid={!!errors.email}
                        required
                        value={data.email}
                        onChange={(event) =>
                            setData("email", event.target.value)
                        }
                        className={
                            "min-w-0 rounded-sm rounded-e-none placeholder-gray-500 border-gray-600 border outline-none border-e-0 py-[1.20rem]"
                        }
                        placeholder={translateKey("site.copy.email_address_2")}
                    />
                    <Button
                        type="submit"
                        disabled={processing}
                        size={"default"}
                        className={
                            "w-auto min-w-16 shrink-0 rounded-l-none py-5 px-4 font-extrabold whitespace-nowrap!"
                        }
                        variant={"secondary"}
                    >
                        {" "}
                        {translateKey("site.copy.join")}{" "}
                    </Button>
                </div>
                {errors.email && (
                    <p role="alert" className="text-sm text-red-300">
                        {errors.email}
                    </p>
                )}
                {wasSuccessful && (
                    <p role="status" className="text-sm text-white">
                        {" "}
                        {translateKey(
                            "site.copy.thank_you_for_subscribing",
                        )}{" "}
                    </p>
                )}
            </form>
            <div className={"flex items-center justify-between gap-2"}>
                <a
                    className={"text-white hover:text-white text-xs font-bold"}
                    href={valueOf(SettingKeyEnum.LINKEDIN_URL) ?? undefined}
                    target={"_blank"}
                >
                    <FaLinkedinIn className={"size-5"} />
                </a>

                <a
                    className={"text-white hover:text-white text-xs font-bold"}
                    href={valueOf(SettingKeyEnum.YOUTUBE_URL) ?? undefined}
                    target={"_blank"}
                >
                    <FaYoutube className={"size-5"} />
                </a>

                <a
                    className={"text-white hover:text-white text-xs font-bold"}
                    href={valueOf(SettingKeyEnum.FACEBOOK_URL) ?? undefined}
                    target={"_blank"}
                >
                    <FaFacebook className={"size-5"} />
                </a>

                <a
                    className={"text-white hover:text-white text-xs font-bold"}
                    href={valueOf(SettingKeyEnum.INSTAGRAM_URL) ?? undefined}
                    target={"_blank"}
                >
                    <FaInstagram className={"size-5"} />
                </a>
            </div>
        </div>
    );
};

export default NewsletterSection;
