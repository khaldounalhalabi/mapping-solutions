import { siteRoute } from "@/lib/site-route";
import { translateKey } from "@/hooks/use-translation";
import usePublicFormProtection from "@/hooks/use-public-form-protection";
import { useForm } from "@inertiajs/react";
import Form from "@/components/form/form";
import Input from "@/components/form/fields/input";
import Textarea from "@/components/form/fields/textarea";
import Select from "@/components/form/fields/select/select";
import Radio from "@/components/form/fields/radio";
import Checkbox from "@/components/form/fields/checkbox";
import Vacancy from "@/models/vacancy";
import { translate } from "@/models/translatable";
import { useTranslation } from "@/hooks/use-translation";

export default function ApplicationForm({
    vacancies,
    vacancy,
}: {
    vacancies?: Vacancy[];
    vacancy?:   Vacancy;
}) {
    const { t } = useTranslation();
    const { protect, protectionFields } = usePublicFormProtection();
    const form = useForm({
        vacancy_id:             vacancy?.id ?? (null as number | null),
        first_name:             "",
        last_name:              "",
        email:                  "",
        phone:                  "",
        referral_source:        "",
        cover_letter:           "",
        relevant_experience:    "",
        linkedin_url:           "",
        eligible_to_work_in_uk: "",
        notice_period:          "",
        gdpr_consent:           false,
    });
    return (
        <div className="public-form">
            {form.wasSuccessful ? (
                <div className="form-success" role="status">
                    {t("publicForms.application_success")}
                </div>
            ) : (
                <Form
                    backButton={false}
                    buttonText={
                        form.processing
                            ? t("publicForms.sending")
                            : t("publicForms.submit")
                    }
                    processing={form.processing}
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.transform(protect);
                        form.post(siteRoute("site.careers.apply"), {
                            preserveScroll: true,
                        });
                    }}
                >
                    {!vacancy && (
                        <Select<string>
                            name="vacancy_id"
                            label={t("publicForms.role")}
                            selected="speculative"
                            data={[
                                {
                                    value: "speculative",
                                    label: t("publicForms.speculative"),
                                },
                                ...(vacancies ?? []).map((v) => ({
                                    value: String(v.id),
                                    label: translate(v.title),
                                })),
                            ]}
                            onChange={(v) =>
                                form.setData(
                                    "vacancy_id",
                                    v === "speculative" ? null : Number(v),
                                )
                            }
                        />
                    )}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {protectionFields}
                        <Input
                            name="first_name"
                            id="first_name_id"
                            label={t("publicForms.first_name")}
                            autoComplete="given-name"
                            required
                            value={form.data.first_name}
                            onChange={(e) =>
                                form.setData("first_name", e.target.value)
                            }
                            placeholder={translateKey("site.copy.first_name")}
                        />
                        <Input
                            name="last_name"
                            id="last_name_id"
                            label={t("publicForms.last_name")}
                            autoComplete="family-name"
                            required
                            value={form.data.last_name}
                            onChange={(e) =>
                                form.setData("last_name", e.target.value)
                            }
                            placeholder={translateKey("site.copy.last_name")}
                        />
                    </div>
                    <Input
                        name="email"
                        id="email_id"
                        type="email"
                        label={t("publicForms.email_address")}
                        autoComplete="email"
                        required
                        value={form.data.email}
                        onChange={(e) => form.setData("email", e.target.value)}
                        placeholder={translateKey(
                            "site.copy.your_email_example_com",
                        )}
                    />
                    <Input
                        name="phone"
                        id="phone_id"
                        type="tel"
                        label={t("publicForms.phone")}
                        autoComplete="tel"
                        required
                        value={form.data.phone}
                        onChange={(e) => form.setData("phone", e.target.value)}
                        placeholder={t("publicForms.phone_example")}
                    />
                    <Select<string>
                        name="referral_source"
                        label={t("publicForms.referral")}
                        placeholder={translateKey("site.copy.select")}
                        data={[
                            {
                                value: "Website",
                                label: translateKey("site.extra.website"),
                            },
                            {
                                value: "LinkedIn",
                                label: translateKey("site.extra.linkedin"),
                            },
                            {
                                value: "Job Board",
                                label: translateKey("site.extra.job_board"),
                            },
                            {
                                value: "Referral",
                                label: translateKey("site.extra.referral"),
                            },
                            {
                                value: "Other",
                                label: translateKey("site.extra.other"),
                            },
                        ]}
                        onChange={(v) => form.setData("referral_source", v)}
                    />
                    <Textarea
                        name="cover_letter"
                        label={t("publicForms.cover_letter")}
                        required
                        value={form.data.cover_letter}
                        onChange={(e) =>
                            form.setData("cover_letter", e.target.value)
                        }
                        placeholder={translateKey(
                            "site.copy.tell_us_why_you_are_interested_in_this_position",
                        )}
                    />
                    <Textarea
                        name="relevant_experience"
                        label={t("publicForms.experience")}
                        value={form.data.relevant_experience}
                        onChange={(e) =>
                            form.setData("relevant_experience", e.target.value)
                        }
                        placeholder={translateKey(
                            "site.copy.describe_your_experience_in_remote_sensing_lidar_gis_or_related_fields",
                        )}
                    />
                    <Input
                        name="linkedin_url"
                        id="linkedin_url_id"
                        type="url"
                        label={t("publicForms.linkedin")}
                        value={form.data.linkedin_url}
                        onChange={(e) =>
                            form.setData("linkedin_url", e.target.value)
                        }
                        placeholder="https://linkedin.com/in/username"
                    />
                    <Radio
                        name="eligible_to_work_in_uk"
                        label={t("publicForms.eligible")}
                        items={[
                            {
                                value: "1",
                                label: translateKey("site.copy.yes"),
                            },
                            { value: "0", label: translateKey("site.copy.no") },
                        ]}
                        onChange={(v) =>
                            form.setData("eligible_to_work_in_uk", v)
                        }
                    />
                    <Select<string>
                        name="notice_period"
                        label={t("publicForms.notice")}
                        placeholder={translateKey("site.copy.select")}
                        data={[
                            {
                                value: "Immediate",
                                label: translateKey("site.extra.immediate"),
                            },
                            {
                                value: "1 Month",
                                label: translateKey("site.extra.1_month"),
                            },
                            {
                                value: "2 Months",
                                label: translateKey("site.extra.2_months"),
                            },
                            {
                                value: "3 Months",
                                label: translateKey("site.extra.3_months"),
                            },
                            {
                                value: "Other",
                                label: translateKey("site.extra.other"),
                            },
                        ]}
                        onChange={(v) => form.setData("notice_period", v)}
                    />
                    <Checkbox
                        name="gdpr_consent"
                        label={t("publicForms.consent")}
                        onChange={(v) =>
                            form.setData("gdpr_consent", v === true)
                        }
                    />
                </Form>
            )}
        </div>
    );
}
