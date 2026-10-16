import Vacancy from "@/models/vacancy";
interface JobApplication {
    id:                     number;
    vacancy_id:             number;
    first_name:             string;
    last_name:              string;
    email:                  string;
    phone:                  string;
    referral_source?:       string;
    eligible_to_work_in_uk: boolean;
    notice_period?:         string;
    gdpr_consent:           boolean;
    cover_letter:           string;
    relevant_experience?:   string;
    linkedin_url?:          string;
    vacancy?:               Vacancy;
}

export default JobApplication;
