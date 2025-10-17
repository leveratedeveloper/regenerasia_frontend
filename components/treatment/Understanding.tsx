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
    <section className="px-4 md:px-8">
    <h2 className="font-alta text-center font-serif text-3xl md:text-4xl text-[#364028] mb-6">
      Understanding{" "}
      <span className="italic font-semibold">Cell Regeneration</span>
    </h2>

    <div className="relative w-full mx-auto bg-[#fbfaf8] rounded-2xl shadow-sm p-6 md:p-16">
      <p className="font-helvetica text-center text-gray-700 text-base md:text-lg mb-10 md:mb-12">
        Cells get damaged from free radicals. They come from many sources:
      </p>

      {/* Responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-10 max-w-4xl mx-auto mb-12 md:mb-16">
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
      <div className="block md:hidden">
        <img
          src="/image/product/cell-regenerator.png"
          alt="Human Regenerator Technology"
          className="w-full h-auto object-cover rounded-xl"
        />

        <div className="mt-4 bg-black/40 text-white rounded-xl p-4 backdrop-blur-sm">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex justify-between items-center w-full text-left"
          >
            <span className="font-helvetica text-base font-semibold">
              What does Cold Atmospheric Plasma do?
            </span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isOpen && (
            <p className="mt-3 font-helvetica text-sm sm:text-base leading-relaxed">
              Cold Atmospheric Plasma technology counters free radicals by
              surrounding your body with a therapeutic blend of static energy,
              anions, and electrons.
              <br />
              <br />
              It neutralizes free radicals at their source, empowering your body
              to shift from stress to a state of deep healing and vitality.
            </p>
          )}
        </div>
      </div>

      {/* DESKTOP VERSION (Overlay text on image) */}
      <div className="hidden md:block relative mt-12">
        <img
          src="/image/product/cell-regenerator.png"
          alt="Human Regenerator Technology"
          className="rounded-2xl w-full object-cover shadow-lg"
        />

        <div className="absolute bottom-8 right-8 md:w-1/3 text-white z-10 rounded-xl p-6 backdrop-blur-sm bg-black/40">
          <p className="font-helvetica text-base md:text-lg leading-relaxed">
            Cold Atmospheric Plasma technology counters free radicals by
            surrounding your body with a therapeutic blend of static energy,
            anions, and electrons.
            <br />
            <br />
            It neutralizes free radicals at their source, empowering your body
            to shift from stress to a state of deep healing and vitality.
          </p>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Understanding;
