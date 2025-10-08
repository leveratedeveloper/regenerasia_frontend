
import Legacy from "@/components/about/LegacySection";
import ExpertsSection from "@/components/about/ExpertsSection";
import ContactUsSection from "@/components/ContactUsSection";
import { Cormorant_Garamond, Roboto } from "next/font/google";
import Experience from "@/components/product/Experience";
import Understanding from "@/components/product/Understanding";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose weights you need
  style: ["normal", "italic"], // aktifkan italic
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300"],
});

export default function ProductPage() {
    return (
      <main className="relative z-1 bg-[#f3eee7]">
      {/* Hero with video background */}
      <section className="relative w-full h-screen bg-[#1c1917] flex items-center justify-left p-8 md:p-16">
        <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/image/humanGenerator.jpg)` }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className="relative z-10 flex flex-col items-center px-4 -mt-24">
            <div className="flex items-center gap-2 mb-4">

            <span className="text-sm uppercase tracking-widest">Product</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl">
            <span className="font-light">The Human </span>
            <span className="font-semibold italic">Regenerator</span>
            <span className="font-light"> Power Jet</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Rediscover your vitality and embrace a life of renewed energy and comfort.
            </p>
        </div>

      </section>
      <section className="bg-[rgb(243,238,231)] py-16 md:py-24 px-8">
        <Understanding />
        <Experience />
        {/* <Details />
        <Testimonial /> */}
      </section>
    </main>
    );
  }
  