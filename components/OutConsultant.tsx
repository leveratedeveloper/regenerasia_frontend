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
      <header className="text-center mb-3 mt-10 md:mt-20 lg:mt-20">
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
          <div className="md:col-span-7 flex flex-col justify-center mt-0 md:mt-6 lg:mt-6">
            <h2 className={`${cormorant.className} text-2xl lg:text-2xl text-stone-900 uppercase tracking-widest font-semibold`}>
            Dr PANDE PUTU AGUS MAHENDRA, M.Gizi, Sp.GK
            </h2>
            {/* <h3 className={`${cormorant.className} text-xl lg:text-2xl font-serif text-stone-600 mt-2 mb-2 font-semibold`}>
              Global Chief Medical Advisor
            </h3> */}
            <div className={`${roboto.className} text-stone-700 leading-relaxed text-base mb-10`}>
              <p>
                Dr. Pande Putu Agus Mahendra, M.Gizi, Sp.GK has extensive experience practicing in various hospitals, with a strong passion for the field of nutrition reflected in his career journey and dedication. He has also served as part of the medical team in multiple prestigious sporting events, including the Indonesia Open Aquatic Championship 2017 & 2018, the Asian Games 2018, the Asian Para Games 2018, and several other national and international sports competitions.
              </p>
              <p>Commonly addressed as Dr. Putu, he earned his Medical Doctor degree from the Faculty of Medicine at UKI, then continued his postgraduate education in Clinical Nutrition at the Faculty of Medicine, Universitas Indonesia in 2014. He further pursued the Clinical Nutrition Specialist Program in 2016. In the same year, he completed the Doping Control Officer Training (LADI), followed by the PWC Certified Doping Control Course (2017) and Food Safety Training in Jakarta (2017).
              </p>
              <p>Beyond his clinical practice, Dr. Pande Putu Agus Mahendra is actively involved in several professional organizations, including the Medical and Nutrition Division of PRSI (Indonesian Swimming Association), Head of Nutrition Installation at Bhayangkara Level 1 Hospital, as well as serving as a Certified Doping Control Officer in Indonesia, among others.</p>
              <p>With his strong expertise in clinical nutrition, Dr. Putu provides health consultation services focused on nutritional balance and dietary management to support overall well-being and performance.</p>
              
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
  );
}
