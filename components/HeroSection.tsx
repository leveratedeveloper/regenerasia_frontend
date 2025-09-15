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
          className={`${cormorant.className} text-4xl md:text-6xl font-bold italic mb-4 drop-shadow-lg`}>
          Restart, Restore, Regenerate
        </h1>
        <p className={`${roboto.className} text-[24px] mb-8 drop-shadow-md`}>
          Cold Atmospheric Plasma by Human Regenerator
        </p>
        <a
          href="#book"
          className={`${cormorant.className} px-6 py-1 bg-white/20 backdrop-blur-md border border-white/40 rounded-md text-lg  md:text-4xl  text-white hover:bg-white/10 transition drop-shadow-lg`}>
          Book a Session Now
        </a>
      </section>
    );
  }