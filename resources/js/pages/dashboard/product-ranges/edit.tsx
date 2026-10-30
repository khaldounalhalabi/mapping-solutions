import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import Textarea from "@/components/form/fields/textarea";
import { ChangeEvent } from "react";
import Input from "@/components/form/fields/input";
import UsesField from "./uses-field";
import ProductRange from "@/models/product-range";

const Edit = ({ productRange }: { productRange: ProductRange }) => {
    const { t } = useTranslation();
    const { post, setData, processing } = useForm<
        Partial<{
            _method?:    "PUT" | "POST";
            label:       string;
            range:       string;
            colour:      string;
            title:       string;
            sort_order:  number;
            description: string;
            uses:        string;
        }>
    >({
        _method:     "PUT",
        label:       productRange?.label,
        range:       productRange?.range,
        colour:      productRange?.colour,
        title:       productRange?.title,
        sort_order:  productRange?.sort_order,
        description: productRange?.description,
        uses:        productRange?.uses,
    });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.product.ranges.update", productRange.id));
    };

    return (
        <PageCard
            title={t("dashboard.titles.edit", {
                model: t("models.ProductRange.singular"),
            })}
        >
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                >
                    <Input
                        name="label"
                        label={t("models.ProductRange.fields.label")}
                        type={"text"}
                        onChange={(e) => setData("label", e.target?.value)}
                        defaultValue={productRange.label}
                        required
                    />
                    <Input
                        name="range"
                        label={t("models.ProductRange.fields.range")}
                        type={"text"}
                        onChange={(e) => setData("range", e.target?.value)}
                        defaultValue={productRange.range}
                        required
                    />
                    <Input
                        name="colour"
                        label={t("models.ProductRange.fields.colour")}
                        type="color"
                        id="colour_id"
                        className="h-10 cursor-pointer p-1"
                        onChange={(e) => setData("colour", e.target?.value)}
                        defaultValue={productRange.colour}
                        required
                    />
                    <Input
                        name="title"
                        label={t("models.ProductRange.fields.title")}
                        type={"text"}
                        onChange={(e) => setData("title", e.target?.value)}
                        defaultValue={productRange.title}
                        required
                    />
                    <Input
                        name="sort_order"
                        label={t("models.ProductRange.fields.sort_order")}
                        type={"number"}
                        onChange={(e) =>
                            setData("sort_order", e.target?.valueAsNumber)
                        }
                        defaultValue={productRange.sort_order}
                        required
                    />
                    <div className="md:col-span-2">
                        <Textarea
                            name="description"
                            label={t("models.ProductRange.fields.description")}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setData("description", e.target.value)
                            }
                            defaultValue={productRange.description}
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <UsesField
                            initialValue={productRange.uses}
                            onChange={(value) => setData("uses", value)}
                        />
                    </div>
                </div>
            </Form>
        </PageCard>
    );
};

export default Edit;
