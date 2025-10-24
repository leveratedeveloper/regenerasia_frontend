"use client";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-screen px-4 py-12">
      <p
        className="font-alta text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 drop-shadow-lg leading-snug"
      >
        Restart, Restore, Regenerate
      </p>
      <h1
        className="font-helvetica text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] mb-5 text-white/90"
      >
        Cold Atmospheric Plasma by Human Regenerator
      </h1>
      <a
        href="/booking?booking-form"
        className="font-helvetica px-5 py-2.5 border border-white/40 rounded-md text-[16px] sm:text-[18px] md:text-[20px] text-white hover:bg-white/10 transition drop-shadow-lg backdrop-blur-[24px] mt-5 "
      >
        Book a Session Now
      </a>
    </section>
  );
}
