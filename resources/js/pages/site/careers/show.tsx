import { Head, Link } from "@inertiajs/react";
import { BriefcaseBusiness, CalendarDays, MapPin } from "lucide-react";
import Vacancy from "@/models/vacancy";
import { translate } from "@/models/translatable";
import PublicReveals from "@/components/site/public-reveals";
import PublicRichText from "@/components/site/public-rich-text";
import ApplicationForm from "@/components/site/careers/application-form";

export default function Show({ vacancy }: { vacancy: Vacancy }) {
    const title = translate(vacancy.title);
    const email = `mailto:careers@mapping-solutions.co.uk?subject=${encodeURIComponent(`Application: ${title}`)}`;
    const facts = [
        { label: "Contract", value: vacancy.job_type, Icon: BriefcaseBusiness },
        { label: "Location", value: vacancy.location, Icon: MapPin },
        {
            label: "Closing date",
            value: vacancy.closing_date.split("-").reverse().join("/"),
            Icon: CalendarDays,
        },
    ];
    return (
        <PublicReveals className="jb-page">
            <Head title={`${title} | Careers | Mapping Solutions`}>
                <meta name="description" content={translate(vacancy.excerpt)} />
            </Head>
            <section className="jb-hero">
                <div className="jb-col jb-hero-in">
                    <div className="jb-bar" />
                    <span className="jb-kicker">Careers · Vacancy</span>
                    <h1 className="jb-title">{title}</h1>
                </div>
            </section>
            <div className="jb-wide jb-facts-wrap">
                <div className="jb-facts">
                    {facts
                        .filter((f) => f.value)
                        .map(({ label, value, Icon }) => (
                            <div key={label} className="jb-fact">
                                <span className="jb-fact-ico">
                                    <Icon size={20} />
                                </span>
                                <div>
                                    <p className="jb-fact-l">{label}</p>
                                    <p className="jb-fact-v">{value}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="jb-col jb-body">
                <div className="jb-prose">
                    <PublicRichText html={translate(vacancy.content)} />
                </div>
                <div className="jb-apply">
                    <h3>Ready to apply?</h3>
                    <p>
                        Fill in the form below, and email your CV to{" "}
                        <a href={email}>careers@mapping-solutions.co.uk</a> with
                        the job title in the subject line.
                    </p>
                    <div className="jb-apply-row">
                        <a href="#application-form" className="jb-btn">
                            Go to the form ↓
                        </a>
                        <a href={email} className="jb-btn-ghost">
                            Email your CV
                        </a>
                    </div>
                </div>
                <div className="jb-form" id="application-form">
                    <div className="jb-form-head">
                        <p className="jb-kicker-2">Step 2</p>
                        <h2>Application form</h2>
                        <p>
                            Email your CV to{" "}
                            <a href={email}>careers@mapping-solutions.co.uk</a>{" "}
                            with “{title}” in the subject line.
                        </p>
                    </div>
                    <div className="jb-form-card">
                        <ApplicationForm vacancy={vacancy} />
                    </div>
                </div>
            </div>
            <div className="jb-wide jb-back">
                <Link href={route("site.careers")}>← All vacancies</Link>
            </div>
        </PublicReveals>
    );
}
