import FormPageContentEnquires from "@/components/FormPageContentEnquires";
import { getPageBusiness } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Establish New Era With The Unique Human Regenerator POWER.JET",
  description: "Business Enquiries - Strategic Investments For Extended Well-being",
};

export default async function Page() {
  const page = await getPageBusiness();

  const businessPage = {
    heroTitle:         page?.hero_title          ?? "STRATEGIC INVESTMENTS FOR EXTENDED WELL-BEING",
    heroImage:         page?.hero_image           ?? "/image/business-opportunity-desktop.webp",
    formTabLabel:      page?.form_tab_label       ?? "Business Enquiries",
    partnershipTitle:  page?.partnership_title    ?? "Partnership opportunities . Indonesia's first CAP+ provider",
    partnershipQuote:  page?.partnership_quote    ?? '"The state-of-the-art non-invasive regenerative technology. Now, in Indonesia" in your business.',
    partnershipBullets:(page?.partnership_bullets ?? []) as Array<{ text: string }>,
    productImage1:     page?.product_image_1      ?? "/image/bussines/desktop_photo/1.png",
    productImage2:     page?.product_image_2      ?? "/image/bussines/desktop_photo/2.png",
    productDimension:  page?.product_dimension    ?? "250CM X 235CM X 130CM",
    submitButtonText:  page?.submit_button_text   ?? "Request a partnership proposal",
    termsConfirmLabel: page?.terms_confirm_label  ?? "I confirm that the information provided is accurate and I am authorized to request a quotation.",
    termsCommsLabel:   page?.terms_comms_label    ?? "I agree to receive communications (SMS, Email, Whatsapp) regarding booking confirmation and reminders.",
    footerText:        page?.footer_text          ?? "© 2026 Human Regenerator • Future of Wellness",
  };

  return <FormPageContentEnquires businessPage={businessPage} />;
}
