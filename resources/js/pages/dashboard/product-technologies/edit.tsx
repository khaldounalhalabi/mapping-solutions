import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import Media from "@/models/media";
import FilepondInput from "@/components/form/fields/filepond/filepond-input";
import Input from "@/components/form/fields/input";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import ProductTechnology from "@/models/product-technology";
import React from "react";

const Edit = ({
    productTechnology,
}: {
    productTechnology: ProductTechnology;
}) => {
    const { post, setData, processing } = useForm<
        Partial<{
            _method?: "PUT" | "POST";
            name: string;
            icon_key?: string;
            icon?: Media | File | null;
        }>
    >({
        _method: "PUT",
        name: productTechnology?.name,
        icon_key: productTechnology?.icon_key,
        icon: productTechnology?.icon,
    });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(
            route(
                "v1.web.protected.product.technologies.update",
                productTechnology.id,
            ),
        );
    };

    return (
        <PageCard title="Edit ProductTechnology">
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                    >
                        <TranslatableInput
                            name="name"
                            label={"Name"}
                            onChange={(v) => setData("name", v)}
                            defaultValue={productTechnology.name}
                            required
                        />
                        <Input
                            name="icon_key"
                            label={"Icon Key"}
                            type={"text"}
                            onChange={(e) =>
                                setData("icon_key", e.target?.value)
                            }
                            defaultValue={productTechnology.icon_key}
                        />
                        <div className="md:col-span-2">
                            <FilepondInput
                                name="icon"
                                label={"Icon"}
                                onChange={(file) => setData("icon", file)}
                                acceptedFileTypes={["image/*"]}
                                defaultValue={productTechnology.icon}
                            />
                        </div>
                    </div>
                </Form>
            </FormLocaleProvider>
        </PageCard>
    );
};

export default Edit;
