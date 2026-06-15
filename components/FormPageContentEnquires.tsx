"use client";

import React, { useState } from "react";
import RfqForm from "@/components/RfqForm";
import { useRouter } from "next/navigation";

type ActiveTab = "booking" | "rfq";

export interface BusinessPageData {
  heroTitle?: string;
  heroImage?: string;
  formTabLabel?: string;
  partnershipTitle?: string;
  partnershipQuote?: string;
  partnershipBullets?: Array<{ text: string }>;
  productImage1?: string;
  productImage2?: string;
  productDimension?: string;
  submitButtonText?: string;
  termsConfirmLabel?: string;
  termsCommsLabel?: string;
  footerText?: string;
}

interface Props {
  businessPage?: BusinessPageData;
}

export default function PageContent({ businessPage = {} }: Props) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("booking");
  const router = useRouter();

  const handleTabChange = (tabName: ActiveTab) => {
    setActiveTab(tabName);
    router.replace("?rfq-form");
  };

  const TabButton = ({ label, tabName }: { label: string; tabName: ActiveTab }) => (
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

  const heroImage = businessPage.heroImage ?? "/image/business-opportunity-desktop.webp";
  const heroTitle = businessPage.heroTitle ?? "STRATEGIC INVESTMENTS FOR EXTENDED WELL-BEING";
  const formTabLabel = businessPage.formTabLabel ?? "Business Enquiries";

  return (
    <div className="min-h-screen bg-white dark:bg-white text-black dark:text-black">
      <div className="bg-white dark:bg-white text-black dark:text-black rounded-lg relative">
        {/* HERO */}
        <header className="relative">
          <img
            src={heroImage}
            alt="Banner"
            className="w-full h-96 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-alta font-bold text-white tracking-widest text-center px-4">
              {heroTitle}
            </h1>
          </div>
        </header>

        {/* MAIN */}
        <main className="p-6 md:p-12 max-w-[1800px] mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 p-1 rounded-lg border border-gray-300">
              <TabButton label={formTabLabel} tabName="booking" />
            </div>
          </div>

          <div>
            <RfqForm
              partnershipTitle={businessPage.partnershipTitle}
              partnershipQuote={businessPage.partnershipQuote}
              partnershipBullets={businessPage.partnershipBullets}
              productImage1={businessPage.productImage1}
              productImage2={businessPage.productImage2}
              productDimension={businessPage.productDimension}
              submitButtonText={businessPage.submitButtonText}
              termsConfirmLabel={businessPage.termsConfirmLabel}
              termsCommsLabel={businessPage.termsCommsLabel}
              footerText={businessPage.footerText}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
