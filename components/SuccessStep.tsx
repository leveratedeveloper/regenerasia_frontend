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

    // if (!hasAccess) {
    //   router.replace("/"); // redirect kalau user belum lewat form
    // }

    // opsional: hapus agar gak bisa refresh ulang
    sessionStorage.removeItem("formSuccess");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-[url('/image/bg-thankyou.webp')] bg-cover bg-center">
      <div className="
       px-5 border border-white/40 rounded-md text-[16px] sm:text-[18px] md:text-[20px] hover:bg-white/10 transition drop-shadow-lg backdrop-blur-[24px] mt-5 
      rounded-2xl shadow-lg max-w-xl w-full p-8 flex flex-col items-center text-center space-y-6 animate-fade-in">
        {/* Success Icon */}
        <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
          <Check size={40} className="text-green-600" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-alta">
          You’re All Set!
        </h2>

        {/* Message */}
        <p className="font-helvetica text-[12px] sm:text-[13px] md:text-[16px] text-white">
          Your wellness session is booked. <br />
          Take a moment to breathe and get ready to reset your mind and body. We look forward to seeing you soon.
        </p>
       
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full text-center sm:justify-center">
          <a
            href="/"
            className="w-full sm:w-auto bg-[#3C4D34] text-white px-4 py-2 rounded-lg transition text-center text-[12px] sm:text-[13px] md:text-[16px]"
          >
            Back to Homepage
          </a>

          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white px-8 py-2.5 text-[12px] sm:text-[13px] md:text-[16px] transition-colors rounded-md" > Chat via WhatsApp </a>
        </div>
      </div>
    </div>
  );
}
