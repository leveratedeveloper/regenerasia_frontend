
import React from 'react';
import Image from "next/image";

const Experience: React.FC = () => {
  return (
    <><section className="py-16 md:py-24 px-4">
      <div className="container mx-auto text-center">
        <h2 className="font-alta font-serif text-4xl md:text-5xl text-brand-dark mb-12">
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
              <h3 className="text-xl font-serif text-gray-800 mb-4">
                What to expect
              </h3>
              <p className="text-gray-700 mb-6">
                A soothing 30 minutes journey to rejuvenation.
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-gray-500">◉</span>
                  <span>
                    Experience a deeply soothing 30-minute session, often leading
                    to peaceful sleep or a meditative state
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-gray-500">◉</span>
                  <span>
                    See noticeable benefits after just one session, with 5–10
                    sessions recommended for optimal, sustained wellness
                  </span>
                </li>
              </ul>
            </div>

            {/* Safety guidelines */}
            <div className="bg-[#fbf9f6] rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-serif text-gray-800 mb-4">
                Safety guidelines
              </h3>
              <p className="text-gray-700 mb-6">
                For your safety, do not continue the therapy if you are:
              </p>
              <ul className="space-y-3 text-gray-700">
                {[
                  "Anyone with built-in functioning electrical devices (e.g. pacemakers, hearing aids, implanted drug pumps, etc.)",
                  "Pregnant or breastfeeding women",
                  "Children under the age of 12 years old",
                  "Persons over 150 kg body weight",
                  "Suffers with epileptic seizures",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">⚠️</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-[#fbf9f6] rounded-2xl p-10 text-center shadow-sm">
            <h3 className="text-2xl md:text-3xl italic font-serif text-[#2d3b26] mb-8">
              "I wish I'd found this sooner"
            </h3>
            <div className="max-w-2xl mx-auto text-gray-700 text-base leading-relaxed mb-8">
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
            </div>

            {/* Author info */}
            <div className="flex flex-col items-center">
              <Image
                src="/image/testimonial-sarah.png"
                alt="Sarah"
                width={60}
                height={60}
                className="rounded-full mb-3" />
              <p className="italic font-serif text-gray-800 text-lg">
                Sarah, 56
              </p>
              <p className="text-gray-500 text-sm">Borehamwood, Elstree</p>
            </div>
          </div>
        </div>
      </section></>
  );
};

export default Experience;
