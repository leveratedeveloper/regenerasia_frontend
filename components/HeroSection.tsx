"use client";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-screen px-4 py-12">
      <h1 className="font-alta text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 drop-shadow-lg leading-snug">
        Indonesia's First Cold Atmospheric <br className="hidden md:block" /> Plasma+ Longevity Centre.
      </h1>
      <h2 className="font-helvetica text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] mb-2 text-white/90">
        Recharge. Regenerate. Restart.
      </h2>
      <p className="font-helvetica text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] mb-5 text-white/90 max-w-2xl drop-shadow-lg">
        Non-invasive. German-engineered. Cellular-level regeneration. Now in Jakarta.
      </p>
      <a
        href="/booking"
        className="font-helvetica px-5 py-2.5 border border-white/40 rounded-md text-[16px] sm:text-[18px] md:text-[20px] text-white hover:bg-white/10 transition drop-shadow-lg backdrop-blur-[24px] mt-5 "
      >
        Begin Your Journey
      </a>
      <p className="font-helvetica text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] mt-6 text-white/70">
      Sourced from Germany | Clinically Proven | Zero Downtime | Zero Side Effects
      </p>
    </section>
  );
}
