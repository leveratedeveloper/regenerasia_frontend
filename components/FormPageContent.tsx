"use client";

import React, { useState, useEffect } from "react";
import RfqForm from "@/components/RfqForm";
import BookingForm from "@/components/BookingForm";

type ActiveTab = "booking" | "rfq";

export default function PageContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("booking");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("booking-form")) {
      setActiveTab("booking");
    } else if (params.has("rfq-form")) {
      setActiveTab("rfq");
    }
  }, []);

  const TabButton = ({
    label,
    tabName,
  }: {
    label: string;
    tabName: ActiveTab;
  }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        activeTab === tabName
          ? "bg-green-900 text-white text-white"
          : ""
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen font-sans text-brand-text">
      <div className=" bg-brand-surface rounded-lg relative">
        <header className="relative">
            <img
                src="/image/bg-contact-us.jpg"
                alt="Banner"
                className="w-full h-96 object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h1 className="text-3xl md:text-4xl font-alta font-bold text-white tracking-widest">
                {activeTab === "rfq" ? 'Request for Quotation' : 'Book Your Appointment Online'}
                </h1>
            </div>
        </header>

        <main className="p-6 md:p-12 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 p-1 rounded-lg border border-brand-border">
              <TabButton label="Booking Form" tabName="booking" />
              <TabButton label="Request for Quotation" tabName="rfq" />
            </div>
          </div>

          {activeTab === "rfq" ? <RfqForm /> : <BookingForm />}
        </main>
      </div>
    </div>
  );
}
