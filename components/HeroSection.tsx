"use client";
import { Cormorant_Garamond, Roboto } from "next/font/google";


const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // choose weights you need
    style: ["normal", "italic"], // aktifkan italic
});

const roboto = Roboto({
    subsets: ["latin"],
});

export default function HeroSection() {
    return (
      <section className="flex flex-col items-center justify-center text-center min-h-screen px-4">
        <h1
          className={`${cormorant.className} text-3xl md:text-5xl lg:text-6xl font-bold italic mb-4 drop-shadow-lg`}>
          Restart, Restore, Regenerate
        </h1>
        <p className={`${roboto.className} text-[16px] sm:text-[18px] md:text-[18px] lg:text-[20px] mb-8 drop-shadow-md`}>
          Cold Atmospheric Plasma by Human Regenerator
        </p>
        <a
          href="#book"
          className={`${cormorant.className} px-6 py-2  border border-white/40   md:text-2xl lg:text-3xl text-[18px] text-white hover:bg-white/10 transition drop-shadow-lg`}>
          Book a Session Now
        </a>
      </section>
    );
  }