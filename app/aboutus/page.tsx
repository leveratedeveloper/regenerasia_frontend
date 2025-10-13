import OurMissionVision from "@/components/about/VisionMissionSection";
import Legacy from "@/components/about/LegacySection";
import ExpertsSection from "@/components/about/ExpertsSection";
import ContactUsSection from "@/components/ContactUsSection";
import { Cormorant_Garamond, Roboto } from "next/font/google";

export default function AboutUsPage() {
    return (
      <main className="relative z-1 bg-[#f3eee7]">
      {/* Hero with video background */}
      <section className="relative w-full h-screen bg-[#1c1917] flex items-center justify-left p-8 md:p-16">
        {/* Background image + gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br">
          {/* <img
            src="/image/aboutUs.webp"
            alt="A woman looking thoughtfully towards the sunset over the sea."
            className="w-full h-full object-cover object-center"
          /> */}
          <img
            src="/image/aboutUs.webp"
            alt="A woman looking thoughtfully towards the sunset over the sea."
            className="hidden md:block w-full h-full object-cover object-center"
          />
          <img
            src="/image/aboutUs-mobile.jpeg"
            alt="A woman looking thoughtfully towards the sunset over the sea."
            className="block md:hidden w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-yellow-900/20" />
        </div>

        {/* Content */}
        <div className="relative max-w-4xl w-full text-white/90">
          <div className="mb-6">
            <div className="flex items-center space-x-3 text-gray-300 font-serif italic text-lg">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7L2 17L12 22L22 17L22 7L12 2Z"></path>
              </svg>
              <span className="opacity-80">About Us</span>
            </div>
            <div className="w-25 h-px bg-gray-400/100 mt-2"></div>
          </div>

          <h2 className={`font-alta text-4xl md:text-6xl text-white font-normal leading-tight mb-4`}>
            Bring Regeneration in Asia
          </h2>
          <p className={`font-helvetica text-base md:text-lg text-gray-300/90 leading-relaxed max-w-2xl`}>
            With cutting edge technology, restore your body's stability.
          </p>
        </div>
      </section>

      {/* Founder's Story Section */}
      <section className="bg-[rgb(243,238,231)] py-12 md:py-24 px-6 md:px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center max-w-6xl">
          {/* Image on top for mobile */}
          <div className="order-1 md:order-2 md:col-span-2">
            <img
              src="/image/senior-women.webp"
              alt="A woman looking thoughtfully towards the sunset over the sea."
              className="rounded-2xl shadow-lg w-full h-auto object-cover"
            />
          </div>

          {/* Text section */}
          <div className="order-2 md:order-1 text-zinc-700 font-sans mt-8 md:mt-24">
            <div className="w-16 h-0.5 bg-zinc-600/80 mb-6 md:mb-8"></div>
            <p className="font-helvetica text-base leading-relaxed mb-4 md:mb-6">
              Dr. Sarah Chen witnessed her grandmother's struggle with chronic pain and limited mobility. Despite countless treatments, nothing provided lasting relief until she discovered cellular regeneration therapy.
            </p>
            <p className="font-helvetica text-base leading-relaxed">
              This personal journey sparked a mission to make natural, effective healing accessible to everyone. Regenerasia is here to bring the power of cellular regeneration therapy in Asia.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[rgb(243,238,231)] py-16 md:py-24 px-8">
          <OurMissionVision />
          <Legacy />
          <ExpertsSection />
      </section>
    </main>
    );
  }
  