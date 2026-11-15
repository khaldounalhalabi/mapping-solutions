import TrainingCategory from "@/models/training-category";
interface TrainingCourse {
    id:                   number;
    training_category_id: number;
    name:                 string;
    outline:              string;
    duration:             string;
    level:                string;
    is_published:         boolean;
    sort_order:           number;
    summary:              string;
    training_category?:   TrainingCategory;
}

export default TrainingCourse;
