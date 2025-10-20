import { Cormorant_Garamond, Roboto } from "next/font/google";
import Behind from "@/components/treatment/Behind";
import Experience from "@/components/treatment/Experience";
import ContactUsSection from "@/components/ContactUsSection";
import PlasmaSection from "@/components/treatment/PlasmaSection";
import PackagesSection from "@/components/treatment/PackageSection";
import Understanding from "@/components/treatment/Understanding";


export default function ProductPage() {
  return (
    <main className="relative z-1 bg-[#f3eee7]">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center text-center text-white">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/image/product/human-regenerator.webp)` }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Text content */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Text content */}
        <div className="relative z-10 max-w-4xl px-6 text-center -translate-y-35  ">
          {/* 👆 Moves the text upward (adjust value as needed, e.g., -translate-y-12 or -translate-y-20) */}

          <div className={`font-heveltica uppercase tracking-widest text-sm mb-4 text-gray-200`}>
          Treatment Details
          </div>
          <h1 className="font-alta text-3xl md:text-5xl font-medium leading-tight text-white">
           {/* ? The Human <span className="italic font-semibold">Regenerator</span> Power Jet */}
            Cold Atmospheric Plasma Treatment
          </h1>
          <p className="font-helvetica mt-3 text-md md:text-l text-gray-200 leading-relaxed">
            Discover the revolutionary treatments in our studio, where our personalized screening packages guide every stage of your health journey to optimize your life and extend your healthspan.
          </p>
        </div>
      </section>

      {/* Content sections below */}
      <section className="bg-[#f3eee7] py-16 md:py-20">
        <div className="bg-[#F5F1E9] min-h-screen text-[#2A402E]  mx-auto py-8 md:py-16 px-1 sm:px-2 lg:px-3">
          <main className="container mx-auto">
            <h1 className={`font-alta text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12`}>
              The Science Behind Regeneration
            </h1>
            <div className="space-y-12 md:space-y-16">
              <Understanding />
              <Behind />
              <PlasmaSection />
              <PackagesSection />
            </div>
          </main>
        </div>
      </section>
    </main>
  );
}
