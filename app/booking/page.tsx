import { Suspense } from "react";
import FormPageContent from "@/components/FormPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regenerasia Booking Appointment Online Form",
  description: "Start Your Investment On Longevity! Online Appointment",
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading booking form...</div>}>
      <FormPageContent />
    </Suspense>
  )
}
