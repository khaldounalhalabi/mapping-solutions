import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import Input from "@/components/form/fields/input";

const Create = () => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?: "PUT" | "POST";
            email:    string;
        }>
    >();

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.newsletter.subscribers.store"));
    };

    return (
        <PageCard
            title={t("dashboard.titles.create", {
                model: t("models.NewsletterSubscriber.singular"),
            })}
        >
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                >
                    <Input
                        name="email"
                        label={t("models.NewsletterSubscriber.fields.email")}
                        type={"email"}
                        onChange={(e) => setData("email", e.target?.value)}
                        required
                    />
                </div>
            </Form>
        </PageCard>
    );
};

export default Create;
