import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link, useForm } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import DetailItem from "@/components/ui/detail-item";
import { DetailItemValue } from "@/components/ui/detail-item-value";
import { translate } from "@/models/translatable";
import Inquiry from "@/models/inquiry";
import Form from "@/components/form/form";
import Input from "@/components/form/fields/input";
import Textarea from "@/components/form/fields/textarea";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Show = ({ inquiry }: { inquiry: Inquiry }) => {
    const { t } = useTranslation();
    const { post, setData, processing, reset } = useForm({
        subject: `Re: ${inquiry.subject}`,
        message: "",
    });

    const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route("v1.web.protected.inquiries.respond", inquiry.id), {
            preserveScroll: true,
            onSuccess:      () => reset("message"),
        });
    };

    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.Inquiry.singular"),
            })}
        >
            <div className="flex flex-col gap-8">
                <FieldGroup>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <DetailItem
                            label={t("models.Inquiry.fields.first_name")}
                            value={inquiry.first_name}
                        />
                        <DetailItem
                            label={t("models.Inquiry.fields.last_name")}
                            value={inquiry.last_name}
                        />
                        <DetailItem
                            label={t("models.Inquiry.fields.company")}
                            value={inquiry.company}
                        />
                        <DetailItem
                            label={t("models.Inquiry.fields.country")}
                            value={inquiry.country}
                        />
                        <DetailItem
                            label={t("models.Inquiry.fields.email")}
                            value={inquiry.email}
                        />
                        <DetailItem
                            label={t("models.Inquiry.fields.phone")}
                            value={inquiry.phone}
                        />
                        <DetailItem
                            label={t("models.Inquiry.fields.subject")}
                            value={inquiry.subject}
                        />
                        <DetailItem
                            label={t("models.Inquiry.fields.product_id")}
                            value={
                                inquiry.product ? (
                                    <Link
                                        href={route(
                                            "v1.web.protected.products.show",
                                            inquiry.product_id,
                                        )}
                                    >
                                        <Button>
                                            <DetailItemValue
                                                value={translate(
                                                    inquiry?.product?.name,
                                                )}
                                            />
                                        </Button>
                                    </Link>
                                ) : null
                            }
                        />
                    </div>

                    <DetailItem
                        label={t("models.Inquiry.fields.message")}
                        value={inquiry.message}
                        orientation="vertical"
                        className="md:col-span-2"
                    />
                </FieldGroup>

                {inquiry.response_message && (
                    <div className="flex flex-col gap-5">
                        <Separator />
                        <h2 className="text-lg font-semibold">
                            {t("dashboard.inquiry_response.previous")}
                        </h2>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <DetailItem
                                label={t(
                                    "models.Inquiry.fields.response_subject",
                                )}
                                value={inquiry.response_subject}
                            />
                            <DetailItem
                                label={t("models.Inquiry.fields.responded_by")}
                                value={
                                    inquiry.responded_by
                                        ? `${inquiry.responded_by.first_name ?? ""} ${inquiry.responded_by.last_name ?? ""}`.trim()
                                        : "—"
                                }
                            />
                            <DetailItem
                                label={t("models.Inquiry.fields.responded_at")}
                                value={
                                    inquiry.responded_at
                                        ? new Date(
                                              inquiry.responded_at,
                                          ).toLocaleString()
                                        : "—"
                                }
                            />
                        </div>
                        <DetailItem
                            label={t("models.Inquiry.fields.response_message")}
                            value={inquiry.response_message}
                            orientation="vertical"
                        />
                    </div>
                )}

                <div className="flex flex-col gap-5">
                    <Separator />
                    <h2 className="text-lg font-semibold">
                        {t("dashboard.inquiry_response.title")}
                    </h2>
                    <Form
                        onSubmit={onSubmit}
                        processing={processing}
                        buttonText={t("dashboard.inquiry_response.send")}
                        backButton={false}
                    >
                        <Input
                            name="subject"
                            label={t("models.Inquiry.fields.response_subject")}
                            defaultValue={`Re: ${inquiry.subject}`}
                            onChange={(event) =>
                                setData("subject", event.target.value)
                            }
                            required
                        />
                        <Textarea
                            name="message"
                            label={t("models.Inquiry.fields.response_message")}
                            onChange={(event) =>
                                setData("message", event.target.value)
                            }
                            rows={8}
                            required
                        />
                    </Form>
                </div>
            </div>
        </PageCard>
    );
};

export default Show;
