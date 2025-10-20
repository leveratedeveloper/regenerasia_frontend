"use client"
import React, { useState }  from "react";

const sources = [
  "Inflammation",
  "Smoking",
  "Air Pollution",
  "UV Light",
  "Metabolism",
  "Air Travel",
  "Poor Diet",
  "Toxins",
];

const Understanding: React.FC = () => {
const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="px-1">
    <h2 className="font-heveltica text-center font-serif text-3xl md:text-4xl text-[#364028] mb-6">
      Understanding{" "}
      <span className={`font-heveltica italic font-semibold`}>Cell Regeneration</span>
    </h2>

    <div className="relative w-full mx-auto bg-[#fbfaf8] rounded-2xl shadow-sm p-6 md:p-16">
      <p className={`font-helvetica text-center text-gray-700 text-base md:text-lg mb-10 md:mb-12`}>
        Cells get damaged from free radicals. They come from many sources:
      </p>

      {/* Responsive grid */}
      <div className={`font-heveltica grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-10 max-w-4xl mx-auto mb-12 md:mb-16 mt-8`}>
        {sources.map((source) => (
          <div
            key={source}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#f1eee7] rounded-xl border border-gray-200 shadow-inner flex items-center justify-center"></div>
            <span className="mt-3 text-sm sm:text-base text-gray-700">
              {source}
            </span>
          </div>
        ))}
      </div>

      {/* MOBILE VERSION (Accordion below image) */}
      <div className="relative w-full text-white font-sans overflow-hidden rounded-xl md:rounded-2xl shadow-2xl">
      {/* Background Image */}
      <img
        src="/image/product/cell-regenerator.webp"
        alt="A serene, high-tech wellness clinic environment with a person receiving treatment"
        className="w-full h-full object-cover absolute inset-0 transform scale-105"
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>

      {/* Text Content */}
      <div className="relative flex flex-col justify-center min-h-[60vh] md:min-h-[70vh] p-6 sm:p-10 md:p-16 lg:p-24">
        <div className="max-w-md lg:max-w-lg">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-300 mb-4 font-light">

          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-thin uppercase tracking-wider leading-tight text-gray-100">

          </h1>
          <p className={`font-heveltica mt-6 sm:text-5xl  md:text-1xl text-sm sm:text-base text-gray-50 leading-relaxed`}>
            Cold Atmospheric Plasma (CAP) is the "fourth state of matter,"
             a room-temperature ionized gas known for its cellular regenerative properties.
            While standard CAP is used on the skin's surface, our Regeneresia Human Regenerator uses a specialized, softer CAP+ with smaller particles that penetrate deep into the tissue to treat the entire body.
          </p>
        </div>
      </div>
    </div>
    </div>
  </section>
  );
};

export default Understanding;
