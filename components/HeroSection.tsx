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
          className={`${cormorant.className} text-2xl md:text-3xl lg:text-5xl font-bold italic mb-4 drop-shadow-lg`}>
          Restart, Restore, Regenerate
        </h1>
        <p className={`${roboto.className} text-[10px] sm:text-[12px] md:text-[14px] lg:text-[18px] mb-6 drop-shadow-md`}>
          Cold Atmospheric Plasma by Human Regenerator
        </p>
        <a
          href="#book"
          className={`${cormorant.className} px-4 py-1 border border-white/40 md:text-1xl lg:text-2xl text-[18px] text-white hover:bg-white/10 transition drop-shadow-lg backdrop-blur-[24px]`}>
          Book a Session Now
        </a>
      </section>
    );
  }