import type { Metadata } from "next";
import SuccessStep from "@/components/SuccessStep";

export const metadata: Metadata = {
  title: "Booking Confirmed - Regenerasia",
  description: "Your appointment has been successfully booked. We look forward to seeing you at Regenerasia.",
};


  export default function Success() {
    return (
      <main className="relative z-1 bg-[#f3eee7]">
       <SuccessStep />
      </main>
    );
  }
  