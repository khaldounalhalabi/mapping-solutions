import JobApplication from "@/models/job-application";
import VacancyTypeEnum from "@/enums/vacancy-type-enum";

interface Vacancy {
    id:                number;
    title:             string;
    slug:              string;
    excerpt:           string;
    job_type:          VacancyTypeEnum;
    location?:         string;
    closing_date:      string;
    content:           string;
    job_applications?: JobApplication[];
}

export default Vacancy;
