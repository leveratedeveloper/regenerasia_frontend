import { Cormorant_Garamond, Roboto } from "next/font/google";
import Understanding from "@/components/product/Understanding";
import Experience from "@/components/product/Experience";
import ContactUsSection from "@/components/ContactUsSection";


export default function ProductPage() {
  return (
    <main className="relative z-1 bg-[#f3eee7]">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center text-center text-white">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/image/product/human-regenerator.jpg)` }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Text content */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/image/product/human-generator.jpg)` }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Text content */}
        <div className="relative z-10 max-w-3xl px-6 text-center -translate-y-35  ">
          {/* 👆 Moves the text upward (adjust value as needed, e.g., -translate-y-12 or -translate-y-20) */}

          <p className="uppercase tracking-widest text-sm mb-4 text-gray-200">
            Product
          </p>
          <h1 className="font-alta text-3xl md:text-4xl font-medium leading-tight text-white">
            The Human <span className="italic font-semibold">Regenerator</span> Power Jet
          </h1>
          <p className="font-helvetica mt-3 text-lg md:text-xl text-gray-200 leading-relaxed">
            Rediscover your vitality and embrace a life of renewed <br />energy and comfort.
          </p>
        </div>
      </section>

      {/* Content sections below */}
      <section className="bg-[#f3eee7] py-16 md:py-20 px-8">
        <Understanding />
        <Experience />
      </section>
    </main>
  );
}
