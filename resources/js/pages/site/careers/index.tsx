import { Head, Link } from "@inertiajs/react";
import { CSSProperties } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import Vacancy from "@/models/vacancy";
import { translate } from "@/models/translatable";
import PublicReveals from "@/components/site/public-reveals";
import ApplicationForm from "@/components/site/careers/application-form";

export default function Careers({
    vacancies,
    today,
}: {
    vacancies: Vacancy[];
    today: string;
}) {
    const count = vacancies.length;
    return (
        <PublicReveals className="cr">
            <Head title="Careers | Mapping Solutions">
                <meta
                    name="description"
                    content="Explore careers in remote sensing, geospatial science and specialist instrumentation at Mapping Solutions."
                />
            </Head>
            <section className="hero">
                <div className="hero-dots" aria-hidden="true" />
                <div className="w hero-in">
                    <div className="spectrum" />
                    <p className="kick">Careers</p>
                    <h1>
                        <span className="line">
                            <span>Work on instruments</span>
                        </span>
                        <span className="line">
                            <span>
                                <em>most people never see</em>
                            </span>
                        </span>
                    </h1>
                    <p className="hero-lede">
                        We're a small specialist team supplying and operating
                        remote sensing instruments for research, defence,
                        environmental science and industry. If you have a
                        background in geospatial science, photonics or
                        instrumentation, we'd like to hear from you.
                    </p>
                    <a href="#vacancies" className="hero-pill">
                        <span className="pip" />
                        {count
                            ? `${count} open ${count === 1 ? "role" : "roles"} — view below`
                            : "No open roles — speculative applications welcome"}
                    </a>
                </div>
            </section>
            <section className="sec">
                <div className="w">
                    <div className="head rv">
                        <span className="k2">Why work with us</span>
                        <h2 className="h2">
                            A small team, working on specialist equipment
                        </h2>
                    </div>
                    <div className="bens stag">
                        <div
                            className="ben"
                            style={
                                {
                                    "--acc": "var(--pp-blue)",
                                    "--acc-soft": "var(--pp-sky)",
                                } as CSSProperties
                            }
                        >
                            <span className="ben-ico">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        cx="9"
                                        cy="8"
                                        r="3.2"
                                        stroke="#1a5fb4"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M3.5 19c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5"
                                        stroke="#1a5fb4"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M17 11.5a2.6 2.6 0 100-5.2M18.5 19c-.3-1.9-1.1-3.4-2.3-4.3"
                                        stroke="#1a5fb4"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                            <h3>Small team, direct involvement</h3>
                            <p>
                                A close-knit specialist team, where individual
                                work is visible in the outcome rather than
                                absorbed into a department.
                            </p>
                        </div>

                        <div
                            className="ben"
                            style={
                                {
                                    "--acc": "var(--pp-green)",
                                    "--acc-soft": "var(--pp-leaf)",
                                } as CSSProperties
                            }
                        >
                            <span className="ben-ico">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M12 4L2 9l10 5 10-5-10-5z"
                                        stroke="#2a7d4f"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"
                                        stroke="#2a7d4f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                            <h3>Learning and development</h3>
                            <p>
                                Access to training courses, industry
                                conferences, and hands-on time with current
                                hyperspectral and LiDAR systems.
                            </p>
                        </div>

                        <div
                            className="ben"
                            style={
                                {
                                    "--acc": "var(--pp-teal)",
                                    "--acc-soft": "var(--pp-mint)",
                                } as CSSProperties
                            }
                        >
                            <span className="ben-ico">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="9"
                                        stroke="#0e8074"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M12 7v5l3.2 2"
                                        stroke="#0e8074"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                            <h3>Flexible working</h3>
                            <p>
                                Flexible arrangements, including remote working
                                where the role allows it.
                            </p>
                        </div>

                        <div
                            className="ben"
                            style={
                                {
                                    "--acc": "var(--pp-amber)",
                                    "--acc-soft": "var(--pp-cream)",
                                } as CSSProperties
                            }
                        >
                            <span className="ben-ico">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="9"
                                        stroke="#b96a00"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3z"
                                        stroke="#b96a00"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </span>
                            <h3>International work</h3>
                            <p>
                                Opportunities to travel for airborne survey
                                campaigns, exhibitions and client visits.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sec" id="vacancies">
                <div className="w">
                    <div className="head rv">
                        <span className="k2">
                            {count
                                ? `${count} open ${count === 1 ? "role" : "roles"}`
                                : "Vacancies"}
                        </span>
                        <h2 className="h2">Current vacancies</h2>
                    </div>
                    {count > 0 && (
                        <div className="vacs rv">
                            {vacancies.map((v) => {
                                const days = Math.round(
                                    (Date.parse(v.closing_date) -
                                        Date.parse(today)) /
                                        86400000,
                                );
                                return (
                                    <Link
                                        key={v.id}
                                        href={route("site.vacancy", v.slug)}
                                        className="vac"
                                    >
                                        <div>
                                            <div className="vac-tags">
                                                <span className="tg tg--type">
                                                    {v.job_type}
                                                </span>
                                                {days <= 14 && (
                                                    <span className="tg tg--soon">
                                                        Closing soon ·{" "}
                                                        {days === 0
                                                            ? "today"
                                                            : `${days}d left`}
                                                    </span>
                                                )}
                                            </div>
                                            <h3>{translate(v.title)}</h3>
                                            <p className="vac-ex">
                                                {translate(v.excerpt)}
                                            </p>
                                            <div className="vac-meta">
                                                {v.location && (
                                                    <div>
                                                        <MapPin
                                                            size={15}
                                                            color="#1a5fb4"
                                                        />
                                                        <strong>
                                                            {v.location}
                                                        </strong>
                                                    </div>
                                                )}
                                                <div>
                                                    <CalendarDays
                                                        size={15}
                                                        color="#b96a00"
                                                    />
                                                    <span>
                                                        Closes{" "}
                                                        <strong>
                                                            {v.closing_date
                                                                .split("-")
                                                                .reverse()
                                                                .join("/")}
                                                        </strong>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="vac-go">
                                            View role →
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                    <div className="spec-box rv">
                        <div className="spec-in">
                            <h3>
                                {count
                                    ? "Nothing here that fits?"
                                    : "No open positions at the moment"}
                            </h3>
                            <p>
                                {count
                                    ? "We're always interested in hearing from people with a background in remote sensing, geospatial science, photonics or instrumentation. Send a CV and a short note about what you'd bring to the team."
                                    : "We don't have any vacancies advertised right now, but roles come up as projects do. If your background is in remote sensing, geospatial science, photonics or instrumentation, send us a CV and we'll keep it on file."}
                            </p>
                            <a href="#application-form" className="btn">
                                Send a speculative application
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="apply" id="application-form">
                <div className="w apply-grid">
                    <div className="apply-aside rv">
                        <span className="k2">Apply</span>
                        <h2 className="h2">Send us your application</h2>
                        <p className="sub">
                            Complete the form and email your CV. If you're
                            applying for an advertised role, select the job
                            title so it reaches the right person.
                        </p>
                        <div className="apply-note">
                            <p>
                                Email your CV directly to{" "}
                                <a href="mailto:careers@mapping-solutions.co.uk">
                                    careers@mapping-solutions.co.uk
                                </a>{" "}
                                with the job title in the subject line.
                            </p>
                        </div>
                    </div>
                    <div className="form-shell rv">
                        <ApplicationForm vacancies={vacancies} />
                    </div>
                </div>
            </section>
        </PublicReveals>
    );
}
