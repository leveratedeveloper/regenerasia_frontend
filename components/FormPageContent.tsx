"use client";

import React, { useState, useEffect } from "react";
import RfqForm from "@/components/RfqForm";
import BookingForm from "@/components/BookingForm";

type ActiveTab = "booking" | "rfq";

export default function PageContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("rfq");

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
          ? "bg-brand-primary text-white"
          : "bg-transparent text-brand-primary border border-brand-primary hover:bg-brand-primary/10"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-brand-background min-h-screen font-sans text-brand-text p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-brand-surface rounded-lg relative">
        <header className="flex justify-between items-center p-6 border-b border-brand-border">
          <h1 className="text-xl font-serif font-bold text-brand-primary tracking-widest">
            REGENERASIA
          </h1>
        </header>

        <main className="p-6 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-text mb-6">
              Contact Us
            </h2>
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
