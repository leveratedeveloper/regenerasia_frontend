"use client";

import React from "react";
import { Check, MessageCircle } from "lucide-react";

interface SuccessStepProps {
  resetForm: () => void;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ resetForm }) => {
  // Replace with your WhatsApp number (international format, no + or dashes)
  const whatsappNumber = "628123456789";
  const message = encodeURIComponent("Hi! I just submitted a booking form.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 animate-fade-in py-16">
      {/* Success icon */}
      <div className="relative w-16 h-16">
        <Check
          size={40}
          className="text-brand-green absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12"
        />
        <Check
          size={40}
          className="text-brand-green absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12"
        />
      </div>

      {/* Title and message */}
      <h2 className="text-3xl font-semibold text-brand-dark font-serif">
        Successfully Sent Booking
      </h2>
      <p className="text-brand-gray max-w-sm">
        We will review your details and contact you shortly to confirm your session.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={resetForm}
          className="bg-brand-green text-white px-8 py-2.5 text-sm font-medium hover:bg-opacity-90 transition-colors rounded-md"
        >
          Back to Homepage
        </button>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-2.5 text-sm font-medium transition-colors rounded-md"
        >
          <MessageCircle size={18} />
          Chat via WhatsApp
        </a>
      </div>
    </div>
  );
};

export default SuccessStep;
