import NewsCategory from "@/models/news-category";
import Media from "@/models/media";
interface NewsArticle {
    id:               number;
    news_category_id: number;
    title:            string;
    slug:             string;
    excerpt:          string;
    content:          string;
    hero_image?:      Media | undefined;
    news_category?:   NewsCategory;
}

export default NewsArticle;
