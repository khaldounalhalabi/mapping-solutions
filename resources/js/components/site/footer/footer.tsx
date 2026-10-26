import AddressSection from "@/components/site/footer/address-section";
import NewsletterSection from "@/components/site/footer/newsletter-section";
import EnquirySection from "@/components/site/footer/enquiry-section";
import IsoCertifiedSection from "@/components/site/footer/iso-certified-section";
// TODO: all data here must be from a settings api
const Footer = () => {
    return (
        <div
            className={
                "bg-brand px-page-padding py-10 grid grid-cols-2 md:grid-cols-4 w-full justify-between"
            }
        >
            <AddressSection />
            <NewsletterSection />
            <EnquirySection />
            <IsoCertifiedSection />
        </div>
    );
};

export default Footer;
