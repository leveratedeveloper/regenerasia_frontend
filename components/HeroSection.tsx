"use client";

export default function HeroSection() {
    return (
      <section className="flex flex-col items-center justify-center text-center min-h-screen px-4">
        <h1
          className={`font-alta text-3xl md:text-3xl lg:text-5xl mb-4 drop-shadow-lg`}>
          Restart, Restore, Regenerate
        </h1>
        <p className={`font-helvetica text-[16px] sm:text-[14px] md:text-[14px] lg:text-[18px] mb-6`}>
          Cold Atmospheric Plasma by Human Regenerator
        </p>
        <a
          href="/booking"
          className={`font-helvetica px-4 py-1 border border-white/40 md:text-1xl lg:text-2xl text-[20px] text-white hover:bg-white/10 transition drop-shadow-lg backdrop-blur-[24px] mt-6`}>
          Book a Session Now
        </a>
      </section>
    );
  }