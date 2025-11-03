"use client";

import React, { useState, useEffect } from "react";
import RfqForm from "@/components/RfqForm";
// import BookingForm from "@/components/BookingForm";
import { useRouter } from "next/navigation";

type ActiveTab = "booking" | "rfq";

export default function PageContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("booking");
  const router = useRouter();

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);

  //   if (params.has("rfq-form")) {
  //     setActiveTab("rfq");
  //   } else {
  //     // default to booking
  //     setActiveTab("booking");

  //     // if URL has no tag, set it to ?booking-form
  //     if (!params.has("booking-form")) {
  //       router.replace("?rfq-form");
  //     }
  //   }
  // }, [router]);

  const handleTabChange = (tabName: ActiveTab) => {
    setActiveTab(tabName);

    // Update the query string without reloading
    const newUrl = tabName === "rfq" ? "?rfq-form" : "?rfq-form";
    router.replace(newUrl);
  };

  const TabButton = ({
    label,
    tabName,
  }: {
    label: string;
    tabName: ActiveTab;
  }) => (
    <button
      onClick={() => handleTabChange(tabName)}
      className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        activeTab === tabName
          ? "bg-green-900 text-white"
          : "bg-white text-black dark:bg-white dark:text-black hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-white text-black dark:text-black">
      <div className="bg-white dark:bg-white text-black dark:text-black rounded-lg relative">
        {/* ===== HERO / HEADER SECTION ===== */}
        <header className="relative">
          <img
            src="/image/business-opportunity-desktop.webp"
            alt="Banner"
            className="w-full h-96 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-alta font-bold text-white tracking-widest">
              Strategic investments for extended well-being
            </h1>
          </div>
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <main className="p-6 md:p-12 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 p-1 rounded-lg border border-gray-300">
              <TabButton label="Business Enquires" tabName="booking" />
              {/* <TabButton label="Request for Quotation" tabName="rfq" /> */}
            </div>
          </div>

          {/* <div className={activeTab === "rfq" ? "block" : "hidden"}>
            <RfqForm />
          </div> */}
          <div>
            <RfqForm />
          </div>

        </main>
      </div>
    </div>
  );
}
