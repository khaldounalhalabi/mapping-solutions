import VacancyTypeEnum from "@/enums/vacancy-type-enum";

interface Vacancy {
    id:           number;
    title:        string;
    slug:         string;
    excerpt:      string;
    job_type:     VacancyTypeEnum;
    location?:    string;
    closing_date: string;
    content:      string;
}

export default Vacancy;
