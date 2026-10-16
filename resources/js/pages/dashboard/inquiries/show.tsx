import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import DetailItem from "@/components/ui/detail-item";
import { DetailItemValue } from "@/components/ui/detail-item-value";
import { translate } from "@/models/translatable";
import Inquiry from "@/models/inquiry";

const Show = ({ inquiry }: { inquiry: Inquiry }) => {
    const { t } = useTranslation();
    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.Inquiry.singular"),
            })}
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
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
        </PageCard>
    );
};

export default Show;
