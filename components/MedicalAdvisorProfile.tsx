import React from 'react';
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

const MedicalAdvisorProfile: React.FC = () => {
  return (
    <div className="bg-[#f3eee7] cmin-h-screen text-stone-800 flex flex-col items-center justify-center p-0 sm:p-10">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-3 mt-20">
          <h1 className=" text-3xl md:text-4xl lg:text-5xl text-stone-900">Our Medical Advisor</h1>
        </header>

        <main className="bg-[#f3eee7]  border-stone-300/60 rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
  {/* Image Column */}
            <div className="md:col-span-5 flex items-center justify-center">
              <img
                src="/image/Olivia.jpg"
                alt="Dr. Olivia Ly Lesslar"
                className="rounded-2xl w-full h-auto object-cover shadow-lg"
              />
            </div>

            {/* Text Column */}
            <div className="md:col-span-7 flex flex-col justify-center mt-0 md:mt-12 lg:mt-12">
              <h2 className={`${cormorant.className} text-2xl lg:text-3xl text-stone-900 uppercase tracking-widest font-semibold`}>
                DR. OLIVIA LY LESSLAR
              </h2>
              <h3 className={`${cormorant.className} text-xl lg:text-2xl  text-stone-600 mt-2 mb-2 font-semibold`}>
                Global Chief Medical Advisor
              </h3>

              <div className={`${roboto.className} text-stone-700 leading-relaxed text-base mb-10`}>
                <p>
                Dr. Olivia Ly Lesslar is an Australian medical doctor specialising in psychoneuroimmunology, 
                with postgraduate expertise in skin cancer medicine, dermatology, and clinical nutrition management. 
                 She is the co-founder of Legacy Sciences, an organisation exploring medical conditions 
                 through a non-conventional lens
                </p>
                <p>
                  Dr. Olivia holds key leadership roles in innovative medical and
                  longevity-focused institutions worldwide, including:
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
                  She is also affiliated with LifeSpan Medicine LA, Wellgevity UK, and
                  Everest Health DC. Dr. Olivia is dedicated to advancing the field of
                  functional and longevity medicine worldwide.
                </p>
              </div>
            </div>

            {/* Text Column */}
            <div className="md:col-span-7 order-2 md:order-1 flex flex-col justify-center">
              <h2 className={`${cormorant.className} text-2xl lg:text-3xl text-stone-900 uppercase tracking-widest font-semibold`}>
                DR. ISABELLA SILLAR
              </h2>
              <h3 className={`${cormorant.className} text-xl lg:text-2xl  text-stone-600 mt-2 mb-2 font-semibold`}>
                Our Medical Advisor - Australia/New Zealand
              </h3>

              <div className={`${roboto.className} text-stone-700 leading-relaxed text-base mb-10`}>
                <p>
                  Driven by a passion for enhancing both lifespan and healthspan, Dr.
                  Isabella Sillar brings a unique blend of clinical experience and
                  innovative wellness approaches to her role as Medical Director at Human
                  Regenerator AU/NZ. Her journey into wellness medicine was inspired by a
                  deep commitment to addressing the root causes of health decline rather
                  than merely treating symptoms.
                </p>
                <p>
                  Outside of practice, Dr. Isabella enjoys exploring emerging wellness
                  technologies, outdoor sports, and meditative practices. She views
                  Australia's focus on lifespan as incomplete without an equal emphasis on
                  health-span—quality years lived in optimal health.
                </p>
                <p>
                  Dr. Sillar envisions the Human Regenerator becoming a wellness tool for
                  personalising wellness – allowing individuals to support their health at
                  a cellular and subatomic level.
                </p>
              </div>
            </div>

            
            <div className="md:col-span-5 order-1 md:order-2 flex items-center justify-center">
              <img
                src="/image/Issabela.jpg"
                alt="Dr. Isabella Sillar"
                className="rounded-2xl w-full h-auto object-cover shadow-md"
              />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default MedicalAdvisorProfile;
