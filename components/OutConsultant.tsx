// components/OutConsultant.tsx

import Image from "next/image";

export default function OutConsultant() {
  return (
    <section className="bg-[#FBF8F3] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left - Consultant Image */}
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <Image
              src="/consultant/dr-pande.png" // place your image in public/consultant/
              alt="Dr. Pande"
              width={500}
              height={600}
              className="object-cover"
            />
          </div>
        </div>

        {/* Right - Consultant Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-cormorant text-[#3A3A3A] mb-6">
            Our Consultant
          </h2>

          <h3 className="text-2xl font-cormorant text-[#3A3A3A] mb-2">
            DR. Pande
          </h3>
          <p className="text-lg italic text-[#3A3A3A] mb-4">
            Global Chief Medical Advisor
          </p>

          <p className="text-[#3A3A3A] mb-4">
            She is also affiliated with LifeSpan Medicine LA, Wellgevity UK, and
            Everest Health DC. Dr. Olivia is dedicated to advancing the field of
            functional and longevity medicine worldwide.
          </p>

          <ul className="list-disc list-inside text-[#3A3A3A] mb-4 space-y-1">
            <li>CINGULUM HEALTH (Australia) – Medical Director, Functional & Longevity Medicine</li>
            <li>ATLUS (Australia) – Chief Medical Officer</li>
            <li>LIBER8 (USA) – Medical Director</li>
            <li>VETERAN PEACE (USA) – Medical Director</li>
            <li>SENS.AI (Canada) – Science Director</li>
          </ul>

          <p className="text-[#3A3A3A] mb-4">
            Dr. Olivia holds key leadership roles in innovative medical and
            longevity-focused institutions worldwide, including:
          </p>

          <p className="text-[#3A3A3A]">
            Dr. Olivia Ly Lesslar is an Australian medical doctor specialising
            in psychoneuroimmunology, with postgraduate expertise in skin cancer
            medicine, dermatology, and clinical nutrition management. She is the
            co-founder of Legacy Sciences, an organisation exploring medical
            conditions through a non-conventional lens.
          </p>
        </div>
      </div>
    </section>
  );
}
