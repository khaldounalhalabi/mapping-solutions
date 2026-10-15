import NewsArticle from "@/models/news-article";
interface NewsCategory {
    id:             number;
    name:           string;
    slug:           string;
    news_articles?: NewsArticle[];
}

export default NewsCategory;
