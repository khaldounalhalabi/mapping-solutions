import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import DetailItem from "@/components/ui/detail-item";
import EmailReceiver from "@/models/email-receiver";

const Show = ({ emailReceiver }: { emailReceiver: EmailReceiver }) => {
    const { t } = useTranslation();
    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.EmailReceiver.singular"),
            })}
            actions={
                <Link
                    href={route(
                        "v1.web.protected.email.receivers.edit",
                        emailReceiver.id,
                    )}
                >
                    <Button>{t("dashboard.actions.edit")}</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.EmailReceiver.fields.email")}
                        value={emailReceiver.email}
                    />
                </div>
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
