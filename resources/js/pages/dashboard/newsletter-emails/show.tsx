import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import { DownloadIcon } from "lucide-react";
import DetailItem from "@/components/ui/detail-item";
import NewsletterEmail from "@/models/newsletter-email";

const Show = ({ newsletterEmail }: { newsletterEmail: NewsletterEmail }) => {
    const { t } = useTranslation();
    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.NewsletterEmail.singular"),
            })}
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.NewsletterEmail.fields.title")}
                        value={newsletterEmail.title}
                    />
                    <DetailItem
                        label={t("models.NewsletterEmail.fields.attachments")}
                        value={
                            newsletterEmail?.attachments?.length ? (
                                <div className={"flex flex-wrap gap-2"}>
                                    {newsletterEmail.attachments?.map(
                                        (attachment) => (
                                            <a href={attachment?.url} download>
                                                <Button size={"sm"}>
                                                    {attachment.url
                                                        ?.split("/")
                                                        .pop()}{" "}
                                                    <DownloadIcon />
                                                </Button>
                                            </a>
                                        ),
                                    )}
                                </div>
                            ) : undefined
                        }
                    />
                </div>
                <DetailItem
                    label={t("models.NewsletterEmail.fields.content")}
                    value={newsletterEmail.content}
                    orientation="vertical"
                    className="md:col-span-2"
                    html
                />
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
