import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import DetailItem from "@/components/ui/detail-item";
import NewsletterSubscriber from "@/models/newsletter-subscriber";

const Show = ({
    newsletterSubscriber,
}: {
    newsletterSubscriber: NewsletterSubscriber;
}) => {
    const { t } = useTranslation();
    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.NewsletterSubscriber.singular"),
            })}
            actions={
                <Link
                    href={route(
                        "v1.web.protected.newsletter.subscribers.edit",
                        newsletterSubscriber.id,
                    )}
                >
                    <Button>{t("dashboard.actions.edit")}</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.NewsletterSubscriber.fields.email")}
                        value={newsletterSubscriber.email}
                    />
                </div>
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
