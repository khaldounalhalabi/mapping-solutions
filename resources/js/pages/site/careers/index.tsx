import { formatDate, translateKey } from "@/hooks/use-translation";
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
    today:     string;
}) {
    const count = vacancies.length;
    return (
        <PublicReveals className="cr">
            <Head title={translateKey("site.copy.careers_mapping_solutions")}>
                <meta
                    name="description"
                    content={translateKey(
                        "site.extra.explore_careers_in_remote_sensing_geospatial_science_and_specialist_instrumentation_at_map",
                    )}
                />
            </Head>
            <section className="hero">
                <div className="hero-dots" aria-hidden="true" />
                <div className="w hero-in">
                    <div className="spectrum" />
                    <p className="kick">
                        {" "}
                        {translateKey("site.copy.careers")}{" "}
                    </p>
                    <h1>
                        <span className="line">
                            <span>
                                {" "}
                                {translateKey(
                                    "site.copy.work_on_instruments",
                                )}{" "}
                            </span>
                        </span>
                        <span className="line">
                            <span>
                                <em>
                                    {" "}
                                    {translateKey(
                                        "site.copy.most_people_never_see",
                                    )}{" "}
                                </em>
                            </span>
                        </span>
                    </h1>
                    <p className="hero-lede">
                        {" "}
                        {translateKey(
                            "site.copy.we_re_a_small_specialist_team_supplying_and_operating_remote_sensing_instruments_for_resea",
                        )}{" "}
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
                        <span className="k2">
                            {" "}
                            {translateKey("site.copy.why_work_with_us")}{" "}
                        </span>
                        <h2 className="h2">
                            {" "}
                            {translateKey(
                                "site.copy.a_small_team_working_on_specialist_equipment",
                            )}{" "}
                        </h2>
                    </div>
                    <div className="bens stag">
                        <div
                            className="ben"
                            style={
                                {
                                    "--acc":      "var(--pp-blue)",
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
                            <h3>
                                {" "}
                                {translateKey(
                                    "site.copy.small_team_direct_involvement",
                                )}{" "}
                            </h3>
                            <p>
                                {" "}
                                {translateKey(
                                    "site.copy.a_close_knit_specialist_team_where_individual_work_is_visible_in_the_outcome_rather_than_a",
                                )}{" "}
                            </p>
                        </div>

                        <div
                            className="ben"
                            style={
                                {
                                    "--acc":      "var(--pp-green)",
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
                            <h3>
                                {" "}
                                {translateKey(
                                    "site.copy.learning_and_development",
                                )}{" "}
                            </h3>
                            <p>
                                {" "}
                                {translateKey(
                                    "site.copy.access_to_training_courses_industry_conferences_and_hands_on_time_with_current_hyperspectr",
                                )}{" "}
                            </p>
                        </div>

                        <div
                            className="ben"
                            style={
                                {
                                    "--acc":      "var(--pp-teal)",
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
                            <h3>
                                {" "}
                                {translateKey(
                                    "site.copy.flexible_working",
                                )}{" "}
                            </h3>
                            <p>
                                {" "}
                                {translateKey(
                                    "site.copy.flexible_arrangements_including_remote_working_where_the_role_allows_it",
                                )}{" "}
                            </p>
                        </div>

                        <div
                            className="ben"
                            style={
                                {
                                    "--acc":      "var(--pp-amber)",
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
                            <h3>
                                {" "}
                                {translateKey(
                                    "site.copy.international_work",
                                )}{" "}
                            </h3>
                            <p>
                                {" "}
                                {translateKey(
                                    "site.copy.opportunities_to_travel_for_airborne_survey_campaigns_exhibitions_and_client_visits",
                                )}{" "}
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
                                : translateKey("site.extra.vacancies")}
                        </span>
                        <h2 className="h2">
                            {" "}
                            {translateKey("site.copy.current_vacancies")}{" "}
                        </h2>
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
                                                    {translateKey(
                                                        `enums.${v.job_type}`,
                                                    )}
                                                </span>
                                                {days <= 14 && (
                                                    <span className="tg tg--soon">
                                                        {" "}
                                                        {translateKey(
                                                            "site.copy.closing_soon",
                                                        )}{" "}
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
                                                        {" "}
                                                        {translateKey(
                                                            "site.copy.closes",
                                                        )}{" "}
                                                        <strong>
                                                            {formatDate(
                                                                v.closing_date,
                                                            )}
                                                        </strong>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="vac-go">
                                            {" "}
                                            {translateKey(
                                                "site.copy.view_role",
                                            )}{" "}
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
                                    ? translateKey(
                                          "site.extra.nothing_here_that_fits",
                                      )
                                    : translateKey(
                                          "site.extra.no_open_positions_at_the_moment",
                                      )}
                            </h3>
                            <p>
                                {count
                                    ? "We're always interested in hearing from people with a background in remote sensing, geospatial science, photonics or instrumentation. Send a CV and a short note about what you'd bring to the team."
                                    : "We don't have any vacancies advertised right now, but roles come up as projects do. If your background is in remote sensing, geospatial science, photonics or instrumentation, send us a CV and we'll keep it on file."}
                            </p>
                            <a href="#application-form" className="btn">
                                {" "}
                                {translateKey(
                                    "site.copy.send_a_speculative_application",
                                )}{" "}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="apply" id="application-form">
                <div className="w apply-grid">
                    <div className="apply-aside rv">
                        <span className="k2">
                            {" "}
                            {translateKey("site.copy.apply")}{" "}
                        </span>
                        <h2 className="h2">
                            {" "}
                            {translateKey(
                                "site.copy.send_us_your_application",
                            )}{" "}
                        </h2>
                        <p className="sub">
                            {" "}
                            {translateKey(
                                "site.copy.complete_the_form_and_email_your_cv_if_you_re_applying_for_an_advertised_role_select_the_j",
                            )}{" "}
                        </p>
                        <div className="apply-note">
                            <p>
                                {" "}
                                {translateKey(
                                    "site.copy.email_your_cv_directly_to",
                                )}{" "}
                                <a href="mailto:careers@mapping-solutions.co.uk">
                                    careers@mapping-solutions.co.uk
                                </a>{" "}
                                {translateKey(
                                    "site.copy.with_the_job_title_in_the_subject_line",
                                )}{" "}
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
