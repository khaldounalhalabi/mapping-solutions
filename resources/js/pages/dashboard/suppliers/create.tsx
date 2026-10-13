import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import Media from "@/models/media";
import FilepondInput from "@/components/form/fields/filepond/filepond-input";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import Input from "@/components/form/fields/input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import React from "react";

const Create = () => {
    const { post, setData, processing } = useForm<
        Partial<{
            _method?: "PUT" | "POST";
            name: string;
            slug: string;
            description: string;
            logo?: Media | File | null;
        }>
    >();

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.suppliers.store"));
    };

    return (
        <PageCard title="Add New Supplier">
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <Input
                            name="name"
                            label={"Name"}
                            type={"text"}
                            onChange={(e) => setData("name", e.target?.value)}
                            required
                        />
                        <div className="md:col-span-2">
                            <TranslatableTextarea
                                name="description"
                                label={"Description"}
                                onChange={(v) => setData("description", v)}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <FilepondInput
                                name="logo"
                                label={"Logo"}
                                onChange={(file) => setData("logo", file)}
                                acceptedFileTypes={["image/*"]}
                            />
                        </div>
                    </div>
                </Form>
            </FormLocaleProvider>
        </PageCard>
    );
};

export default Create;
