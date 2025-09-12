"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react"; // hamburger icon
import HeroSection from "../components/HeroSection";
import Journey from '../components/Journey';
import Energize from "@/components/Energize";
import MedicalAdvisorProfile from '@/components/MedicalAdvisorProfile';
import OutConsultant from "@/components/OutConsultant";
import ContactUsSection from "@/components/ContactUsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [open, setOpen] = useState(false);

  const journeySteps = [
    { id: 1, imageUrl: 'https://picsum.photos/id/1015/600/400', caption: 'Fill registration form' },
    { id: 2, imageUrl: 'https://picsum.photos/id/219/600/400', caption: 'Treatment program' },
    { id: 3, imageUrl: 'https://picsum.photos/id/20/600/400', caption: 'Screening & data collection' },
    { id: 4, imageUrl: 'https://picsum.photos/id/1079/600/400', caption: 'Program report by consultant' },
    { id: 5, imageUrl: 'https://picsum.photos/id/431/600/400', caption: 'Analysis & report by consultant' },
  ];

  const energizeSteps = [
    { id: 1, imageUrl: 'https://picsum.photos/id/1015/600/400', caption: 'Fill registration form' },
    { id: 2, imageUrl: 'https://picsum.photos/id/219/600/400', caption: 'Treatment program' },
    { id: 3, imageUrl: 'https://picsum.photos/id/20/600/400', caption: 'Screening & data collection' },
    { id: 4, imageUrl: 'https://picsum.photos/id/1079/600/400', caption: 'Program report by consultant' },
    { id: 5, imageUrl: 'https://picsum.photos/id/431/600/400', caption: 'Analysis & report by consultant' },
    { id: 6, imageUrl: 'https://picsum.photos/id/431/600/400', caption: 'Analysis & report by consultant' },
  ];



const oliviaData = {
  name: "DR. OLIVIA LY LESSLAR",
  title: "Global Chief Medical Advisor",
  imageUrl: "https://i.imgur.com/rM7a0nU.png",
  bio: [
    <p key="olivia-p1">Dr. Olivia Ly Lesslar is an Australian medical doctor specialising in psychoneuroimmunology, with postgraduate expertise in skin cancer medicine, dermatology, and clinical nutrition management. She is the co-founder of Legacy Sciences, an organisation exploring medical conditions through a non-conventional lens.</p>,
    <p key="olivia-p2">Dr. Olivia holds key leadership roles in innovative medical and longevity-focused institutions worldwide, including:</p>,
    <ul key="olivia-list" className="list-disc list-inside space-y-2 pl-2 font-medium text-stone-800">
      <li>CINGULUM HEALTH (Australia) – <span className="font-normal text-stone-700">Medical Director, Functional & Longevity Medicine</span></li>
      <li>ATLUS (Australia) – <span className="font-normal text-stone-700">Chief Medical Officer</span></li>
      <li>LIBER8 (USA) – <span className="font-normal text-stone-700">Medical Director</span></li>
      <li>VETERAN PEACE(USA) – <span className="font-normal text-stone-700">Medical Director</span></li>
      <li>SENS.AI (CANADA) – <span className="font-normal text-stone-700">Science Director.</span></li>
    </ul>,
    <p key="olivia-p3">She is also affiliated with LifeSpan Medicine LA, Wellgevity UK, and Everest Health DC. Dr. Olivia is dedicated to advancing the field of functional and longevity medicine worldwide.</p>
  ],
  imagePosition: 'left' as const
};

const isabellaData = {
  name: "DR. ISABELLA SILLAR",
  title: "Our Medical Advisor - Australia/New Zealand",
  imageUrl: "https://i.imgur.com/0a4y8vC.png",
  bio: [
    <p key="isabella-p1">Driven by a passion for enhancing both lifespan and healthspan, Dr. Isabella Sillar brings a unique blend of clinical experience and innovative wellness approaches to her role as Medical Director at Human Regenerator AU/NZ. Her journey into wellness medicine was inspired by a deep commitment to addressing the root causes of health decline rather than merely treating symptoms.</p>,
    <p key="isabella-p2">Outside of practice, Dr. Isabella enjoys exploring emerging wellness technologies, outdoor sports, and meditative practices. She views Australia’s focus on lifespan as incomplete without an equal emphasis on health-span—quality years lived in optimal health.</p>,
    <p key="isabella-p3">Dr. Sillar envisions the Human Regenerator becoming a wellness tool for personalising wellness - allowing individuals to support their health at a cellular and subatomic level.</p>
  ],
  imagePosition: 'right' as const
};

  return (
    <div className="relative font-sans text-white">
      {/* Background video */}
      <video
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src="https://res.cloudinary.com/deyfby6ir/video/upload/v1757412142/Regenerasia_Hero_Video_hd55xi.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-20 
        bg-gradient-to-b from-black/70 to-transparent">
        {/* Menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-white hover:opacity-80"
        >
          <Menu className="w-6 h-6" />
          <span className="text-sm sm:text-base font-medium">Menu</span>
        </button>

        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/image/logo.jpg"
            alt="Logo"
            width={100}
            height={40}
            className="h-10 w-auto invert brightness-0"
          />
        </div>
      </header>

      {/* Dropdown menu when open */}
      {open && (
        <nav className="fixed top-16 left-0 w-48 bg-black/80 text-white flex flex-col gap-4 p-4 z-30 rounded-r-lg">
          <a href="#home" className="hover:underline">
            Home
          </a>
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#services" className="hover:underline">
            Services
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>
      )}

      {/* Main Content */}
      <main className="relative z-10">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center bg-black/40">
        <HeroSection />
      </section>

      {/* Journey */}
      <section className="min-h-screen w-full bg-[#FBF8F3] text-[#3A3A3A] flex flex-col items-center py-40">
        <Journey steps={journeySteps} />
      </section>

      <section className="min-h-screen w-full bg-[#FBF8F3] text-[#3A3A3A] flex flex-col items-center py-40">
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
