import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import DetailItem from "@/components/ui/detail-item";
import { DetailItemValue } from "@/components/ui/detail-item-value";
import { translate } from "@/models/translatable";
import JobApplication from "@/models/job-application";
import { ExternalLink } from "lucide-react";

const Show = ({ jobApplication }: { jobApplication: JobApplication }) => {
    const { t } = useTranslation();
    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.JobApplication.singular"),
            })}
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.JobApplication.fields.first_name")}
                        value={jobApplication.first_name}
                    />
                    <DetailItem
                        label={t("models.JobApplication.fields.last_name")}
                        value={jobApplication.last_name}
                    />
                    <DetailItem
                        label={t("models.JobApplication.fields.email")}
                        value={jobApplication.email}
                    />
                    <DetailItem
                        label={t("models.JobApplication.fields.phone")}
                        value={jobApplication.phone}
                    />
                    <DetailItem
                        label={t(
                            "models.JobApplication.fields.referral_source",
                        )}
                        value={jobApplication?.referral_source}
                    />
                    <DetailItem
                        label={t(
                            "models.JobApplication.fields.eligible_to_work_in_uk",
                        )}
                        value={
                            jobApplication.eligible_to_work_in_uk
                                ? t("dashboard.boolean.yes")
                                : t("dashboard.boolean.no")
                        }
                    />
                    <DetailItem
                        label={t("models.JobApplication.fields.notice_period")}
                        value={jobApplication?.notice_period}
                    />
                    <DetailItem
                        label={t("models.JobApplication.fields.gdpr_consent")}
                        value={
                            jobApplication.gdpr_consent
                                ? t("dashboard.boolean.yes")
                                : t("dashboard.boolean.no")
                        }
                    />
                    <DetailItem
                        label={t("models.JobApplication.fields.vacancy_id")}
                        value={
                            jobApplication.vacancy_id ? (
                                <Link
                                    href={route(
                                        "v1.web.protected.vacancies.show",
                                        jobApplication.vacancy_id,
                                    )}
                                >
                                    <Button>
                                        <DetailItemValue
                                            value={translate(
                                                jobApplication?.vacancy?.title,
                                            )}
                                        />
                                    </Button>
                                </Link>
                            ) : (
                                t("publicForms.speculative")
                            )
                        }
                    />
                    <DetailItem
                        label={t("models.JobApplication.fields.linkedin_url")}
                        value={
                            jobApplication?.linkedin_url ? (
                                <a
                                    href={jobApplication?.linkedin_url}
                                    target={"_blank"}
                                >
                                    <Button size="icon">
                                        <ExternalLink />
                                    </Button>
                                </a>
                            ) : undefined
                        }
                    />
                </div>

                <DetailItem
                    label={t("models.JobApplication.fields.cover_letter")}
                    value={jobApplication.cover_letter}
                    orientation="vertical"
                    className="md:col-span-2"
                />
                <DetailItem
                    label={t(
                        "models.JobApplication.fields.relevant_experience",
                    )}
                    value={jobApplication?.relevant_experience}
                    orientation="vertical"
                    className="md:col-span-2"
                />
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
