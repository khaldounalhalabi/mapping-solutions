import { siteRoute } from "@/lib/site-route";
import { formatDate, translateKey } from "@/hooks/use-translation";
import { Link } from "@inertiajs/react";
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
        {
            label: translateKey("site.copy.contract"),
            value: translateKey(`enums.${vacancy.job_type}`),
            Icon:  BriefcaseBusiness,
        },
        {
            label: translateKey("site.copy.location"),
            value: vacancy.location,
            Icon:  MapPin,
        },
        {
            label: translateKey("site.copy.closing_date"),
            value: formatDate(vacancy.closing_date),
            Icon:  CalendarDays,
        },
    ];
    return (
        <PublicReveals className="jb-page">
            <section className="jb-hero">
                <div className="jb-col jb-hero-in">
                    <div className="jb-bar" />
                    <span className="jb-kicker">
                        {" "}
                        {translateKey("site.copy.careers_vacancy")}{" "}
                    </span>
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
                    <h3> {translateKey("site.copy.ready_to_apply")} </h3>
                    <p>
                        {" "}
                        {translateKey(
                            "site.copy.fill_in_the_form_below_and_email_your_cv_to",
                        )}{" "}
                        <a href={email}>careers@mapping-solutions.co.uk</a>{" "}
                        {translateKey(
                            "site.copy.with_the_job_title_in_the_subject_line",
                        )}{" "}
                    </p>
                    <div className="jb-apply-row">
                        <a href="#application-form" className="jb-btn">
                            {" "}
                            {translateKey("site.copy.go_to_the_form")}{" "}
                        </a>
                        <a href={email} className="jb-btn-ghost">
                            {" "}
                            {translateKey("site.copy.email_your_cv")}{" "}
                        </a>
                    </div>
                </div>
                <div className="jb-form" id="application-form">
                    <div className="jb-form-head">
                        <p className="jb-kicker-2">
                            {" "}
                            {translateKey("site.copy.step_2")}{" "}
                        </p>
                        <h2> {translateKey("site.copy.application_form")} </h2>
                        <p>
                            {" "}
                            {translateKey("site.copy.email_your_cv_to")}{" "}
                            <a href={email}>careers@mapping-solutions.co.uk</a>{" "}
                            {translateKey("site.copy.with")} {title}{" "}
                            {translateKey("site.copy.in_the_subject_line")}{" "}
                        </p>
                    </div>
                    <div className="jb-form-card">
                        <ApplicationForm vacancy={vacancy} />
                    </div>
                </div>
            </div>
            <div className="jb-wide jb-back">
                <Link href={siteRoute("site.careers")}>
                    {" "}
                    {translateKey("site.copy.all_vacancies")}{" "}
                </Link>
            </div>
        </PublicReveals>
    );
}
