// components/OutConsultant.tsx

import Image from "next/image";
import { Cormorant_Garamond, Roboto } from "next/font/google";


const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // choose weights you need
    style: ["normal", "italic"], // aktifkan italic
});

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300"],
});

export default function OutConsultant() {
  return (
    <div className="bg-[#f3eee7] cmin-h-screen font-sans text-stone-800 flex flex-col items-center justify-center p-0 sm:p-10">
    <div className="w-full max-w-7xl mx-auto">
      <header className="text-center mb-3 mt-20">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900">Our Consultant</h1>
      </header>

      <main className="bg-[#f3eee7]  border-stone-300/60 rounded-3xl p-6 sm:p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
{/* Image Column */}
          <div className="md:col-span-5 flex items-center justify-center">
            <img
              src="/image/dr-pande.png"
              alt="Dr. Olivia Ly Lesslar"
              className="rounded-2xl w-full h-auto object-cover shadow-lg"
            />
          </div>

          {/* Text Column */}
          <div className="md:col-span-6 flex flex-col justify-center mt-12 md:mt-12">
            <h2 className={`${cormorant.className} text-2xl lg:text-3xl text-stone-900 uppercase tracking-widest font-semibold`}>
            DR. Pande
            </h2>
            <h3 className={`${cormorant.className} text-xl lg:text-2xl font-serif text-stone-600 mt-2 mb-2 font-semibold`}>
              Global Chief Medical Advisor
            </h3>

            <div className={`${roboto.className} text-stone-700 leading-relaxed text-base mb-10`}>
              <p>
              She is also affiliated with LifeSpan Medicine LA, Wellgevity UK, and Everest Health DC. Dr. 
              Olivia is dedicated to advancing the field of functional and longevity medicine worldwide.
              </p>
              <ul className="list-disc list-inside ">
                <li>
                  CINGULUM HEALTH (Australia) 
                    - Medical Director, Functional & Longevity Medicine
                </li>
                <li>
                  ATLUS (Australia) 
                   - Chief Medical Officer
                </li>
                <li>
                  LIBER8 (USA) - Medical Director
                </li>
                <li>
                  VETERAN PEACE(USA) - Medical Director
                </li>
                <li>
                  SENS.AI (CANADA) - Science Director
                </li>
              </ul>
              <p>
              Dr. Olivia holds key leadership roles in innovative medical and longevity-focused institutions worldwide, including:
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
  );
}
