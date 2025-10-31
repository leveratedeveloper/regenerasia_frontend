"use client";

import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";


export default function SuccessStep() {
  const whatsappNumber = "628123456789";
  const message = encodeURIComponent("Hi! I just submitted a booking form.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
  const router = useRouter();

  useEffect(() => {
    const hasAccess = sessionStorage.getItem("formSuccess");

    if (!hasAccess) {
      router.replace("/"); // redirect kalau user belum lewat form
    }

    // opsional: hapus agar gak bisa refresh ulang
    sessionStorage.removeItem("formSuccess");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 flex flex-col items-center text-center space-y-6 animate-fade-in">
        {/* Success Icon */}
        <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
          <Check size={40} className="text-green-600" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Booking Sent Successfully!
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-base sm:text-lg">
          Thank you for submitting your booking. <br />
          We will review your details and contact you shortly to confirm your session.
        </p>
       
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <a
            href="/"
            className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-medium transition text-center"
          >
            Back to Homepage
          </a>

          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white px-8 py-2.5 text-sm font-medium transition-colors rounded-md" > Chat via WhatsApp </a>
        </div>
      </div>
    </div>
  );
}
