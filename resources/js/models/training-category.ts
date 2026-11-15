import TrainingCourse from "@/models/training-course";
interface TrainingCategory {
    id:         number;
    name:       string;
    sort_order: number;
    summary:    string;

    training_courses?: TrainingCourse[];
}

export default TrainingCategory;
