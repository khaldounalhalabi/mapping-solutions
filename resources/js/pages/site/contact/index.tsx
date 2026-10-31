import { Head, useForm } from "@inertiajs/react";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import Form from "@/components/form/form";
import Input from "@/components/form/fields/input";
import Textarea from "@/components/form/fields/textarea";
import Select from "@/components/form/fields/select/select";
import PublicReveals from "@/components/site/public-reveals";
import { useTranslation } from "@/hooks/use-translation";

export default function Contact() {
    const { t } = useTranslation();
    const form = useForm({
        first_name: "",
        last_name: "",
        company: "",
        country: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const cards = [
        {
            title: "Call us",
            text: "+44 8251 99303",
            note: "Monday to Friday, 9am–5pm UK time",
            href: "tel:+44825199303",
            Icon: Phone,
            color: "#1a5fb4",
            bg: "#e8f1fb",
        },
        {
            title: "Email us",
            text: "info@mapping-solutions.co.uk",
            note: "We reply within one working day",
            href: "mailto:info@mapping-solutions.co.uk",
            Icon: Mail,
            color: "#0e8074",
            bg: "#e2f3f0",
        },
        {
            title: "Visit us",
            text: "69 Hamilton Road, Manchester, M13 0PD, United Kingdom",
            note: "Please arrange visits in advance",
            Icon: MapPin,
            color: "#b96a00",
            bg: "#fdf3e3",
        },
    ];
    return (
        <PublicReveals className="ct">
            <Head title="Contact | Mapping Solutions">
                <meta
                    name="description"
                    content="Contact Mapping Solutions for remote sensing instruments, surveys, training and technical support."
                />
            </Head>
            <section className="hero">
                <div className="w hero-in">
                    <div className="spectrum" />
                    <p className="kick">Contact</p>
                    <h1>Talk to us about your project</h1>
                    <p>
                        Whether it's a product enquiry, a survey to plan, or a
                        question about training, tell us what you're trying to
                        measure and we'll come back with practical advice.
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
                                <a className="card" key={title} href={href}>
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
            <div className="w main">
                <div className="grid">
                    <div className="aside rv">
                        <span className="k2">Send a message</span>
                        <h2 className="h2">Tell us what you need to measure</h2>
                        <p className="sub">
                            The more you can tell us about the application — the
                            target, the area, the accuracy — the more useful our
                            first reply will be.
                        </p>
                        <ul className="aside-list">
                            {[
                                "Product enquiries and quotes",
                                "Airborne survey and data processing",
                                "Training courses and consultancy",
                                "Support, calibration and repair",
                            ].map((item) => (
                                <li key={item}>
                                    <Check size={16} color="#0e8074" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="aside-note">
                            <p>
                                We work in English, Arabic and French — write to
                                us in whichever you prefer.
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
                                        form.post(route("site.contact.store"), {
                                            preserveScroll: true,
                                        });
                                    }}
                                >
                                    <div
                                        className="form-name-grid"
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                                            gap: 20,
                                        }}
                                    >
                                        <Input
                                            name="first_name"
                                            id="first_name_id"
                                            label={t("publicForms.first_name")}
                                            placeholder="First Name"
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
                                            placeholder="Last Name"
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
                                        placeholder="your.email@example.com"
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
                                    <Select
                                        required
                                        name="subject"
                                        label={t("publicForms.subject")}
                                        placeholder="- Select -"
                                        data={[
                                            "General enquiry",
                                            "Product enquiry",
                                            "Request a quote",
                                            "Survey services",
                                            "Training course",
                                            "Technical support",
                                        ]}
                                        onChange={(v) =>
                                            form.setData("subject", v)
                                        }
                                    />
                                    <Textarea
                                        name="message"
                                        label={t("publicForms.message")}
                                        placeholder="Please describe your enquiry, including which products or services you are interested in and your application area."
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
