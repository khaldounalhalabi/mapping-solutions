import Media from "@/models/media";
interface NewsletterEmail {
    id:           number;
    title:        string;
    content:      string;
    attachments?: Media[] | undefined;
}

export default NewsletterEmail;
