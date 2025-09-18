"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import HeroSection from "../components/HeroSection";
import Journey from '../components/Journey';
import Energize from "@/components/Energize";
import MedicalAdvisorProfile from '@/components/MedicalAdvisorProfile';
import OutConsultant from "@/components/OutConsultant";
import ContactUsSection from "@/components/ContactUsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

 
  useEffect(() => {
    const handleScroll = () => {
      const firstDivHeight =
        document.getElementById("first-section")?.offsetHeight || 0;

      // ✅ trigger at 80% of the first-section height
      const triggerPoint = firstDivHeight * 0.7;

      if (window.scrollY > triggerPoint) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  const journeySteps = [
    { id: 1, imageUrl: '/image/journey_1.png', caption: 'Fill registration form' },
    { id: 2, imageUrl: '/image/journey_2.png', caption: 'Treatment program' },
    { id: 3, imageUrl: '/image/journey_3.png', caption: 'Screening & data collection' },
    { id: 4, imageUrl: '/image/journey_4.png', caption: 'Program report by consultant' },
    { id: 5, imageUrl: '/image/journey_5.png', caption: 'Analysis & report by consultant' },
  ];

  const energizeSteps = [
    { id: 1, imageUrl: '/image/energize_1.png', caption: 'Cellular regeneration' },
    { id: 2, imageUrl: '/image/energize_2.png', caption: 'Strengthening immune system' },
    { id: 3, imageUrl: '/image/energize_3.png', caption: 'Accelerate recovery' },
    { id: 4, imageUrl: '/image/energize_4.png', caption: 'Enhance energy level' },
    { id: 5, imageUrl: '/image/energize_5.png', caption: 'Aids quality of sleep' },
    { id: 6, imageUrl: '/image/energize_6.png', caption: 'Support anti aging' },
  ];

  const oliviaData = { /* ...unchanged... */ };
  const isabellaData = { /* ...unchanged... */ };

  return (
    <div className="relative font-sans text-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-20 transition-colors duration-300
          border-[#F5F1E9]
          ${scrolled ? "bg-[#f3eee7] shadow-lg" : "bg-gradient-to-b from-black/70 to-transparent"}`}
      >
        {/* Menu button */}
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2    ${scrolled ? "text-black" : "text-white "} hover:opacity-80`}
        >
          <Menu className="w-6 h-6" />
          <span className="text-sm sm:text-base font-medium">Menu</span>
        </button>

        {/* Logo */}
        <div className="flex items-center">
          <Image
            src={scrolled ? "/image/logo_green.jpg" : "/image/logo.jpg"}
            alt="Logo"
            width={100}
            height={40}
            className="h-10 w-auto "
          />
        </div>
      </header>

      {/* Dropdown menu when open */}
      {open && (
        <nav className="fixed top-16 left-0 w-48 bg-black/80 text-white flex flex-col gap-4 p-4 z-30 rounded-r-lg">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      )}

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

        <MedicalAdvisorProfile />
        <OutConsultant />
        <ContactUsSection />
        <Footer />
      </main>
    </div>
  );
}
