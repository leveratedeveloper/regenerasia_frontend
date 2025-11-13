
import React from 'react';
import Image from "next/image";

const Experience: React.FC = () => {
  return (
    <><section className="py-16 md:py-24 px-4">
      <div className="container mx-auto text-center">
        <h2 className="font-alta text-4xl md:text-5xl text-brand-dark mb-12">
          The Regeneration <i>Experience</i>
        </h2>
        <div className="max-w-6xl mx-auto">
          <img
            src="/image/product/human-power.jpg"
            alt="The Regeneration Experience"
            className="rounded-xl shadow-lg w-full" />
        </div>
      </div>
    </section><section className=" px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Top two cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* What to expect */}
            <div className="font-helvetica bg-[#fbf9f6] rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl text-gray-800 mb-4">
                What to expect
              </h3>
              <p className="text-gray-700 mb-6">
                A soothing 30 minutes journey to rejuvenation.
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-1">
                  <span className="mt-1 text-gray-500"><img src="data:image/svg+xml;utf8,<svg width='25' height='25' viewBox='0 0 96 100' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='96' height='100'/><polygon points='48,5 85,28 85,72 48,95 11,72 11,28' stroke='%233C2726' stroke-width='8' fill='none' stroke-linejoin='round'/></svg>" alt="hexagon" />
                  </span>
                  <span>
                    Experience a deeply soothing 30-minute session, often leading
                    to peaceful sleep or a meditative state
                  </span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="mt-1 text-gray-500"><img src="data:image/svg+xml;utf8,<svg width='25' height='25' viewBox='0 0 96 100' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='96' height='100'/><polygon points='48,5 85,28 85,72 48,95 11,72 11,28' stroke='%233C2726' stroke-width='8' fill='none' stroke-linejoin='round'/></svg>" alt="hexagon" />
                  </span>
                  <span>
                    See noticeable benefits after just one session, with 5 – 10
                    sessions recommended for optimal, sustained wellness
                  </span>
                </li>
              </ul>
            </div>

            {/* Safety guidelines */}
            <div className="bg-[#fbf9f6] rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl text-gray-800 mb-4">
                Safety guidelines
              </h3>
              <p className="text-gray-700 mb-6">
                For your safety, do not continue the therapy if you are:
              </p>
              <ul className="space-y-3 text-gray-700">
                {[
                   "Anyone with built-in functioning electrical devices (e.g. pacemakers, hearing aids, implanted drug pumps, etc.)",
                   "Pregnant or breastfeeding women",
                   "Active lesions preclude treatment",
                   "Severe illness contraindicates service. (*minta tolong refrensi lain)",
                   "Children under 17 years old",
                   "Persons over 150 kg body weight",
                   "Prohibited for patients with electrical, magnetic, or mechanical implants",
                   "Those suffering from epileptic seizures",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1"><img src="data:image/svg+xml;utf8,<svg width='25' height='25' viewBox='0 0 96 100' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='96' height='100'/><polygon points='48,5 85,28 85,72 48,95 11,72 11,28' stroke='%233C2726' stroke-width='8' fill='none' stroke-linejoin='round'/></svg>" alt="hexagon" /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-[#fbf9f6] rounded-3xl p-10 md:p-16 text-center shadow-sm  mx-auto">
            <h3 className="font-alta text-2xl md:text-3xl italic text-[#2d3b26] mb-8">
              "I wish I'd found this sooner"
            </h3>
            <div className="font-helvetica text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 text-justify">
              <p>
                Wow!! Where do I start! I was introduced to The Human Regenerator™
                by the amazing Helen! I am suffering from severe endometriosis and
                after having finished my first course my symptoms are so much
                better and I really wish I could have known about this sooner.
              </p>
              <br />
              <p>
                My energy has come back and I no longer need to take painkillers
                and this is only the beginning; I’m excited to see how my body
                continues to heal. Thank you Helen and Richie for all your
                knowledge and support on my journey. I am very grateful!!
              </p>
          
              {/* Author info */}
              <div className="flex flex-col items-end text-right">
                <Image
                  src="/image/product/sarah.png"
                  alt="Sarah"
                  width={60}
                  height={60}
                  className="rounded-full mb-3"
                />
                <p className="font-alta italic text-gray-800 text-lg">
                  Sarah, 56
                </p>
                <p className="font-helvetica text-gray-500 text-sm">Borehamwood, Elstree</p>
              </div>
            </div>

          </div>
        </div>
      </section></>
  );
};

export default Experience;
