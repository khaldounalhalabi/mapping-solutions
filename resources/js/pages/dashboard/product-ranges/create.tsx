import { useForm } from "@inertiajs/react";
import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import Textarea from "@/components/form/fields/textarea";
import { ChangeEvent } from "react";
import Input from "@/components/form/fields/input";

const Create = () => {
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
    >();

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.product.ranges.store"));
    };

    return (
        <PageCard
            title={t("dashboard.titles.create", {
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
                        required
                    />
                    <Input
                        name="range"
                        label={t("models.ProductRange.fields.range")}
                        type={"text"}
                        onChange={(e) => setData("range", e.target?.value)}
                        required
                    />
                    <Input
                        name="colour"
                        label={t("models.ProductRange.fields.colour")}
                        type={"text"}
                        onChange={(e) => setData("colour", e.target?.value)}
                        required
                    />
                    <Input
                        name="title"
                        label={t("models.ProductRange.fields.title")}
                        type={"text"}
                        onChange={(e) => setData("title", e.target?.value)}
                        required
                    />
                    <Input
                        name="sort_order"
                        label={t("models.ProductRange.fields.sort_order")}
                        type={"number"}
                        onChange={(e) =>
                            setData("sort_order", e.target?.valueAsNumber)
                        }
                        required
                    />
                    <div className="md:col-span-2">
                        <Textarea
                            name="description"
                            label={t("models.ProductRange.fields.description")}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setData("description", e.target.value)
                            }
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <Textarea
                            placeholder="One use per line"
                            name="uses"
                            label={t("models.ProductRange.fields.uses")}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setData("uses", e.target.value)
                            }
                            required
                        />
                    </div>
                </div>
            </Form>
        </PageCard>
    );
};

export default Create;
