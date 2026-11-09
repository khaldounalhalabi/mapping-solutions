import { siteRoute } from "@/lib/site-route";
import { translateKey } from "@/hooks/use-translation";
import usePublicFormProtection from "@/hooks/use-public-form-protection";
import { useForm } from "@inertiajs/react";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import Form from "@/components/form/form";
import Input from "@/components/form/fields/input";
import Textarea from "@/components/form/fields/textarea";
import Select from "@/components/form/fields/select/select";
import PublicReveals from "@/components/site/public-reveals";
import { useTranslation } from "@/hooks/use-translation";
import useSettings from "@/hooks/use-settings";
import SettingKeyEnum from "@/enums/setting-key-enum";

export default function Contact() {
    const { valueOf } = useSettings();
    const { t } = useTranslation();
    const { protect, protectionFields } = usePublicFormProtection();
    const form = useForm({
        first_name: "",
        last_name:  "",
        company:    "",
        country:    "",
        email:      "",
        phone:      "",
        subject:    "",
        message:    "",
    });
    const cards = [
        {
            title: translateKey("site.copy.call_us"),
            text:  valueOf(SettingKeyEnum.CONTACT_PHONE),
            note:  "Monday to Friday, 9am–5pm UK time",
            href:  `tel:${valueOf(SettingKeyEnum.CONTACT_PHONE)}`,
            Icon:  Phone,
            color: "#1a5fb4",
            bg:    "#e8f1fb",
        },
        {
            title: translateKey("site.copy.email_us"),
            text:  valueOf(SettingKeyEnum.CONTACT_EMAIL),
            note:  translateKey("site.extra.we_reply_within_one_working_day"),
            href:  `mailto:${valueOf(SettingKeyEnum.CONTACT_EMAIL)}`,
            Icon:  Mail,
            color: "#0e8074",
            bg:    "#e2f3f0",
        },
        {
            title: translateKey("site.copy.visit_us"),
            text:  valueOf(SettingKeyEnum.ADDRESS),
            href:  valueOf(SettingKeyEnum.ADDRESS_GOOGLE_MAP_URL),
            note:  translateKey("site.extra.please_arrange_visits_in_advance"),
            Icon:  MapPin,
            color: "#b96a00",
            bg:    "#fdf3e3",
        },
    ];
    return (
        <PublicReveals className="ct">
            <section className="hero">
                <div className="w hero-in">
                    <div className="spectrum" />
                    <p className="kick">
                        {" "}
                        {translateKey("site.copy.contact")}{" "}
                    </p>
                    <h1>
                        {" "}
                        {translateKey(
                            "site.copy.talk_to_us_about_your_project",
                        )}{" "}
                    </h1>
                    <p>
                        {" "}
                        {translateKey(
                            "site.copy.whether_it_s_a_product_enquiry_a_survey_to_plan_or_a_question_about_training_tell_us_what_",
                        )}{" "}
                    </p>
                </div>
            </section>
            <div className="cards">
                <div className="cards-grid stag">
                    {cards.map(
                        ({ title, text, note, href, Icon, color, bg }) => {
                            const body = (
                                <>
                                    <span
                                        className="card-ico"
                                        style={{ background: bg }}
                                    >
                                        <Icon size={20} color={color} />
                                    </span>
                                    <h3>{title}</h3>
                                    <p>{text}</p>
                                    <small>{note}</small>
                                </>
                            );
                            return href ? (
                                <a
                                    className="card"
                                    key={title}
                                    href={href}
                                    target={"_blank"}
                                >
                                    {body}
                                </a>
                            ) : (
                                <div className="card" key={title}>
                                    {body}
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
            <div className="w main px-5!">
                <div className="grid">
                    <div className="aside rv">
                        <span className="k2">
                            {" "}
                            {translateKey("site.copy.send_a_message")}{" "}
                        </span>
                        <h2 className="h2">
                            {" "}
                            {translateKey(
                                "site.copy.tell_us_what_you_need_to_measure",
                            )}{" "}
                        </h2>
                        <p className="sub">
                            {" "}
                            {translateKey(
                                "site.copy.the_more_you_can_tell_us_about_the_application_the_target_the_area_the_accuracy_the_more_u",
                            )}{" "}
                        </p>
                        <ul className="aside-list">
                            {[
                                {
                                    value: "Product enquiries and quotes",
                                    label: translateKey(
                                        "site.extra.product_enquiries_and_quotes",
                                    ),
                                },
                                {
                                    value: "Airborne survey and data processing",
                                    label: translateKey(
                                        "site.extra.airborne_survey_and_data_processing",
                                    ),
                                },
                                {
                                    value: "Training courses and consultancy",
                                    label: translateKey(
                                        "site.extra.training_courses_and_consultancy",
                                    ),
                                },
                                {
                                    value: "Support, calibration and repair",
                                    label: translateKey(
                                        "site.extra.support_calibration_and_repair",
                                    ),
                                },
                            ].map((item) => (
                                <li key={item.value}>
                                    <Check size={16} color="#0e8074" />
                                    <span>{item.label}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="aside-note">
                            <p>
                                {" "}
                                {translateKey(
                                    "site.copy.we_work_in_english_arabic_and_french_write_to_us_in_whichever_you_prefer",
                                )}{" "}
                            </p>
                        </div>
                    </div>
                    <div className="form-shell rv">
                        <div className="public-form">
                            {form.wasSuccessful ? (
                                <div role="status" className="form-success">
                                    {t("publicForms.contact_success")}
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
                                        form.post(
                                            siteRoute("site.contact.store"),
                                            {
                                                preserveScroll: true,
                                            },
                                        );
                                    }}
                                >
                                    <div
                                        className="form-name-grid"
                                        style={{
                                            display:             "grid",
                                            gridTemplateColumns:
                                                "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                                            gap:                 20,
                                        }}
                                    >
                                        {protectionFields}
                                        <Input
                                            name="first_name"
                                            id="first_name_id"
                                            label={t("publicForms.first_name")}
                                            placeholder={translateKey(
                                                "site.copy.first_name",
                                            )}
                                            autoComplete="given-name"
                                            required
                                            value={form.data.first_name}
                                            onChange={(e) =>
                                                form.setData(
                                                    "first_name",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <Input
                                            name="last_name"
                                            id="last_name_id"
                                            label={t("publicForms.last_name")}
                                            placeholder={translateKey(
                                                "site.copy.last_name",
                                            )}
                                            autoComplete="family-name"
                                            required
                                            value={form.data.last_name}
                                            onChange={(e) =>
                                                form.setData(
                                                    "last_name",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <Input
                                        name="company"
                                        id="company_id"
                                        label={t("publicForms.company")}
                                        autoComplete="organization"
                                        required
                                        value={form.data.company}
                                        onChange={(e) =>
                                            form.setData(
                                                "company",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <Input
                                        name="country"
                                        id="country_id"
                                        label={t("publicForms.country")}
                                        autoComplete="country-name"
                                        required
                                        value={form.data.country}
                                        onChange={(e) =>
                                            form.setData(
                                                "country",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <Input
                                        name="email"
                                        id="email_id"
                                        type="email"
                                        label={t("publicForms.email")}
                                        autoComplete="email"
                                        placeholder={translateKey(
                                            "site.copy.your_email_example_com",
                                        )}
                                        required
                                        value={form.data.email}
                                        onChange={(e) =>
                                            form.setData(
                                                "email",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <Input
                                        name="phone"
                                        id="phone_id"
                                        type="tel"
                                        label={t("publicForms.telephone")}
                                        autoComplete="tel"
                                        placeholder="e.g. +44 7123 456789"
                                        required
                                        value={form.data.phone}
                                        onChange={(e) =>
                                            form.setData(
                                                "phone",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <Select<string>
                                        required
                                        name="subject"
                                        label={t("publicForms.subject")}
                                        placeholder={translateKey(
                                            "site.copy.select",
                                        )}
                                        data={[
                                            {
                                                value: "General enquiry",
                                                label: translateKey(
                                                    "site.extra.general_enquiry",
                                                ),
                                            },
                                            {
                                                value: "Product enquiry",
                                                label: translateKey(
                                                    "site.extra.product_enquiry",
                                                ),
                                            },
                                            {
                                                value: "Request a quote",
                                                label: translateKey(
                                                    "site.extra.request_a_quote",
                                                ),
                                            },
                                            {
                                                value: "Survey services",
                                                label: translateKey(
                                                    "site.extra.survey_services",
                                                ),
                                            },
                                            {
                                                value: "Training course",
                                                label: translateKey(
                                                    "site.extra.training_course",
                                                ),
                                            },
                                            {
                                                value: "Technical support",
                                                label: translateKey(
                                                    "site.extra.technical_support",
                                                ),
                                            },
                                        ]}
                                        onChange={(v) =>
                                            form.setData("subject", v)
                                        }
                                    />
                                    <Textarea
                                        name="message"
                                        label={t("publicForms.message")}
                                        placeholder={translateKey(
                                            "site.copy.please_describe_your_enquiry_including_which_products_or_services_you_are_interested_in_an",
                                        )}
                                        required
                                        value={form.data.message}
                                        onChange={(e) =>
                                            form.setData(
                                                "message",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </Form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PublicReveals>
    );
}
