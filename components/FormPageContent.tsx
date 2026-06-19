"use client";

import React, { useState } from "react";
import BookingForm from "@/components/BookingForm";
import { useRouter } from "next/navigation";

export interface BookingPageData {
  heroTitle: string;
  bannerImage: string;
  formTabLabel: string;
  safetyTitle: string;
  safetyLead: string;
  safetyItems: Array<{ item: string }>;
  safetyCheckboxLabel: string;
  submitButtonText: string;
}

interface FormPageContentProps {
  bookingPage?: BookingPageData;
}

type ActiveTab = "booking";

export default function FormPageContent({ bookingPage }: FormPageContentProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("booking");
  const router = useRouter();

  const handleTabChange = (tabName: ActiveTab) => {
    setActiveTab(tabName);
    router.replace("?booking-form");
  };

  const heroTitle   = bookingPage?.heroTitle ?? "Start your investment on longevity! Book Your Appointment Online";
  const bannerImage = bookingPage?.bannerImage ?? "/image/treatment-form-desktop.webp";
  const tabLabel    = bookingPage?.formTabLabel ?? "Booking Treatment Form";

  // Render headline — split by \n into separate lines
  const heroLines = heroTitle.split('\n').filter(l => l.trim());

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="bg-white text-black rounded-lg relative">

        {/* Hero / Header */}
        <header className="relative">
          <img
            src={bannerImage}
            alt="Booking Banner"
            className="w-full h-96 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="mx-3 text-3xl md:text-4xl font-alta font-bold text-white tracking-widest text-center">
              {heroLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < heroLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 md:p-12 max-w-[1200px] mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 p-1 rounded-lg border border-gray-300">
              <button
                onClick={() => handleTabChange("booking")}
                className="px-6 py-2 rounded-md text-sm font-medium transition-colors duration-300 bg-green-900 text-white"
              >
                {tabLabel}
              </button>
            </div>
          </div>

          <div className={activeTab === "booking" ? "block" : "hidden"}>
            <BookingForm
              safetyTitle={bookingPage?.safetyTitle}
              safetyLead={bookingPage?.safetyLead}
              safetyItems={bookingPage?.safetyItems}
              safetyCheckboxLabel={bookingPage?.safetyCheckboxLabel}
              submitButtonText={bookingPage?.submitButtonText}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
