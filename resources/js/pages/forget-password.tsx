import { useForm } from "@inertiajs/react";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Form from "@/components/form/form";
import Input from "@/components/form/fields/input";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";

const ForgetPassword = () => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<{
        email: string;
    }>();

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("v1.web.public.request.reset.password"));
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {t("dashboard.auth.forgot_password_title")}
                </CardTitle>
                <CardDescription>
                    {t("dashboard.auth.forgot_password_description")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form
                    onSubmit={onSubmit}
                    processing={processing}
                    backButton={false}
                    buttonText={t("dashboard.auth.send_code")}
                >
                    <FieldGroup>
                        <Input
                            name={"email"}
                            onChange={(e) => setData("email", e.target.value)}
                            label={t("dashboard.auth.email")}
                            required={true}
                            type="email"
                        />
                    </FieldGroup>
                </Form>
            </CardContent>
        </Card>
    );
};

export default ForgetPassword;
