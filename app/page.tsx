"use client";

import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Journey from '../components/Journey';
import Energize from "@/components/Energize";
import MedicalAdvisorProfile from '@/components/MedicalAdvisorProfile';
import OutConsultant from "@/components/OutConsultant";
import ContactUsSection from "@/components/ContactUsSection";

export default function Home() {
  const journeySteps = [
    { id: 1, imageUrl: '/image/journey_1.png', caption: 'Fill registration form', description: 'Start by registering and sharing your personal details to help us understand you better.' },
    { id: 2, imageUrl: '/image/journey_2.png', caption: 'Screening & Data Collection', description: 'Collecting your health profile through personalized screening to ensure accurate recommendations.' },
    { id: 3, imageUrl: '/image/journey_3.png', caption: 'Analysis & Report by Consultant', description: 'Comprehensive analysis and tailored report by our consultant to guide your treatment plan.' },
    { id: 4, imageUrl: '/image/journey_4.png', caption: 'Treatment Program', description: 'Personalized Cold Atmospheric Plasma therapy for effective and targeted healing.' },
    { id: 5, imageUrl: '/image/journey_5.png', caption: 'Program Report by Consultant', description: 'Comprehensive progress report and personalized guidance post-treatment.' },
  ];

  const energizeSteps = [
    { id: 1, imageUrl: '/image/energize_1.png', caption: 'Cellular regeneration',  description: '' },
    { id: 2, imageUrl: '/image/energize_2.png', caption: 'Strengthening immune system',  description: '' },
    { id: 3, imageUrl: '/image/energize_3.png', caption: 'Exelerate Recovery',  description: '' },
    { id: 4, imageUrl: '/image/energize_4.png', caption: 'Enhance Energy Level',  description: '' },
    { id: 5, imageUrl: '/image/energize_5.png', caption: 'Aids Quality of Sleep',  description: '' },
    { id: 6, imageUrl: '/image/energize_6.png', caption: 'Support Anti Aging',  description: '' },
  ];

  const oliviaData = { /* ...unchanged... */ };
  const isabellaData = { /* ...unchanged... */ };

  return (
    <div className="relative font-sans text-white">
      {/* Main Content */}
      <main className="relative z-1 bg-[#f3eee7]">
        {/* Hero with video background */}
        <section className="relative min-h-screen flex items-center justify-center bg-black/40" id="first-section">
          <video
            className="absolute inset-0 w-full h-full object-cover -z-10"
            src="https://res.cloudinary.com/deyfby6ir/video/upload/v1757412142/Regenerasia_Hero_Video_hd55xi.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <HeroSection />
        </section>

        {/* Journey */}
        <section className=" min-h-screen w-full bg-[#f3eee7] text-[#3A3A3A] flex flex-col items-center py-4  md:py-14">
          <Journey steps={journeySteps} />
        </section>

        {/* Energize */}
        <section className="min-h-screen w-full bg-[#f3eee7] text-[#3A3A3A] flex flex-col items-center mt-10">
          <Energize steps={energizeSteps} />
        </section>

        <section className="container w-[100%] mx-auto">
          <OutConsultant />
        </section>
        <ContactUsSection />
      </main>
    </div>
  );
}
