import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import FilepondInput, {
    MediaInput,
} from "@/components/form/fields/filepond/filepond-input";
import Input from "@/components/form/fields/input";
import TextEditor from "@/components/form/fields/text-editor";

const Create = () => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?:     "PUT" | "POST";
            title:        string;
            content:      string;
            attachments?: MediaInput[] | null;
        }>
    >();

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.newsletter.emails.store"));
    };

    return (
        <PageCard
            title={t("dashboard.titles.create", {
                model: t("models.NewsletterEmail.singular"),
            })}
        >
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                >
                    <Input
                        name="title"
                        label={t("models.NewsletterEmail.fields.title")}
                        type={"text"}
                        onChange={(e) => setData("title", e.target?.value)}
                        required
                    />
                    <div className="md:col-span-2">
                        <TextEditor
                            name="content"
                            label={t("models.NewsletterEmail.fields.content")}
                            onChange={(e) => setData("content", e)}
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <FilepondInput
                            name="attachments"
                            label={t(
                                "models.NewsletterEmail.fields.attachments",
                            )}
                            isMultiple={true}
                            onChange={(file) => setData("attachments", file)}
                        />
                    </div>
                </div>
            </Form>
        </PageCard>
    );
};

export default Create;
