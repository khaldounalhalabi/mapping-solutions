import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import Input from "@/components/form/fields/input";
import EmailReceiver from "@/models/email-receiver";

const Edit = ({ emailReceiver }: { emailReceiver: EmailReceiver }) => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?: "PUT" | "POST";
            email:    string;
        }>
    >({ _method: "PUT", email: emailReceiver?.email });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(
            route("v1.web.protected.email.receivers.update", emailReceiver.id),
        );
    };

    return (
        <PageCard
            title={t("dashboard.titles.edit", {
                model: t("models.EmailReceiver.singular"),
            })}
        >
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                >
                    <Input
                        name="email"
                        label={t("models.EmailReceiver.fields.email")}
                        type={"email"}
                        onChange={(e) => setData("email", e.target?.value)}
                        defaultValue={emailReceiver.email}
                        required
                    />
                </div>
            </Form>
        </PageCard>
    );
};

export default Edit;
