import type { Metadata } from "next";
import BookingForm from '@/components/BookingForm';

export const metadata: Metadata = {
  title: "Regenerasia - Booking Session",
  description: "Modern property with stunning views at Izzara.",
};

export default function Page() {
  return (
    <div className="font-sans text-brand-dark min-h-screen flex flex-col items-center justify-start py-8 sm:py-12 px-4">
      <BookingForm />
    </div>
  );
}
