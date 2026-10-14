import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import Media from "@/models/media";
import FilepondInput from "@/components/form/fields/filepond/filepond-input";
import Input from "@/components/form/fields/input";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import React from "react";

const Create = () => {
    const { post, setData, processing } = useForm<
        Partial<{
            _method?: "PUT" | "POST";
            name: string;
            icon_key?: string;
            icon?: Media | File | null;
        }>
    >();

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("v1.web.protected.product.technologies.store"));
    };

    return (
        <PageCard title="Add New ProductTechnology">
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <TranslatableInput
                            name="name"
                            label={"Name"}
                            onChange={(v) => setData("name", v)}
                            required
                        />
                        <Input
                            name="icon_key"
                            label={"Icon Key"}
                            type={"text"}
                            onChange={(e) =>
                                setData("icon_key", e.target?.value)
                            }
                        />
                        <div className="md:col-span-2">
                            <FilepondInput
                                name="icon"
                                label={"Icon"}
                                onChange={(file) => setData("icon", file)}
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
