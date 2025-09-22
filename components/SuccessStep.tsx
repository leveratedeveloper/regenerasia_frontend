"use client";

import React from 'react';
import { Check } from 'lucide-react';

interface SuccessStepProps {
  resetForm: () => void;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ resetForm }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 animate-fade-in py-16">
      <div className="relative w-16 h-16">
        <Check size={40} className="text-brand-green absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12" />
        <Check size={40} className="text-brand-green absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12" />
      </div>

      <h2 className="text-3xl font-semibold text-brand-dark font-serif">Successfully Sent Booking</h2>
      <p className="text-brand-gray max-w-sm">We will review your details and contact you shortly to confirm your session.</p>
      
      <button
        onClick={resetForm}
        className="bg-brand-green text-white px-8 py-2.5 text-sm font-medium hover:bg-opacity-90 transition-colors"
      >
        Back to Homepage
      </button>
    </div>
  );
};

export default SuccessStep;
