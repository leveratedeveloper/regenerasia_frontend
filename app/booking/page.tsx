import { Suspense } from "react";
import type { Metadata } from "next";
import { getPageBooking } from "@/lib/api";
import FormPageContent from "@/components/FormPageContent";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBooking();
  return {
    title: page?.meta_title ?? "Book Your Appointment - Regenerasia | Online Booking",
    description: page?.meta_description ?? "Start your investment on longevity. Book your Cold Atmospheric Plasma+ treatment appointment online at Regenerasia.",
  };
}

export default async function BookingPage() {
  const page = await getPageBooking();

  const bookingPage = {
    heroTitle:          page?.hero_title ?? "Start your investment on longevity! Book Your Appointment Online",
    bannerImage:        page?.banner_image ?? "/image/treatment-form-desktop.webp",
    formTabLabel:       page?.form_tab_label ?? "Booking Treatment Form",
    safetyTitle:        page?.safety_title ?? "Safety guidelines",
    safetyLead:         page?.safety_lead ?? "For your safety, do not continue the therapy if you are:",
    safetyItems:        (page?.safety_items ?? []) as Array<{ item: string }>,
    safetyCheckboxLabel: page?.safety_checkbox_label ?? "I have read the safety guidelines and confirm that I do not have the conditions listed above.",
    submitButtonText:   page?.submit_button_text ?? "Submit",
  };

  return (
    <Suspense fallback={<div>Loading booking form...</div>}>
      <FormPageContent bookingPage={bookingPage} />
    </Suspense>
  );
}
