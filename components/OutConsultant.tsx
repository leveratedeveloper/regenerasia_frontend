// components/OutConsultant.tsx

import Image from "next/image";

export default function OutConsultant() {
  return (
    <div className="bg-[#f3eee7] text-stone-800 flex flex-col items-center justify-center">
    <div className="w-full max-w-7xl mx-auto">
      <header className="text-center mb-3 mt-20">
        <h1 className="font-alta text-3xl md:text-4xl lg:text-5xl text-[#2f332f]">OUR CONSULTANT</h1>
      </header>

      <main className="bg-[#f3eee7] border-stone-300/60 rounded-3xl p-6 sm:p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Image Column */}
          <div className="md:col-span-5 flex items-center justify-center">
            <img
              src="/image/doctor/dr-pande.webp"
              alt="Dr. Olivia Ly Lesslar"
              className="rounded-2xl w-full h-auto object-cover shadow-lg"
            />
          </div>

          {/* Text Column */}
          <div className="md:col-span-7 flex flex-col justify-center mt-0 md:mt-6 lg:mt-6">
            <h2 className={`font-alta text-2xl lg:text-2xl text-stone-900 uppercase tracking-widest font-semibold`}>
            Dr PANDE PUTU AGUS MAHENDRA, M.Gizi, Sp.GK
            </h2>
            <div className={`font-helvetica text-justify text-stone-700 leading-relaxed text-base mb-10`}>
              <p>When your body needs to perform at its highest level, nutrition is not optional, it is the foundation. Dr. Putu has built his career on exactly that belief.</p>
              <p>
                Highly regarded as one of Indonesia's leading Clinical Nutrition Specialists, Dr. Putu has spent over a decade helping patients. From elite athletes to everyday individuals to achieve their health goals through precise, science-backed nutritional strategy. His approach is not about restriction. It is about optimisation: giving the body exactly what it needs to recover faster, perform better, and age well.
              </p>
              <p>His credentials speak for themselves. A graduate of Universitas Indonesia's Clinical Nutrition Specialist Programme, Dr. Putu has served on the medical teams of some of Indonesia's most prestigious sporting events. Including the Asian Games 2018, the Asian Para Games 2018, and the Indonesia Open Aquatic Championship. He is a Certified Doping Control Officer, a role that reflects both his depth of knowledge and the trust placed in him at the national level.</p>
              <p>At Regenerasia, Dr. Putu brings that same performance-driven mindset to longevity medicine. Helping clients understand not just how to be healthy today, but how to stay that way for decades to come.</p>   
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
  );
}
