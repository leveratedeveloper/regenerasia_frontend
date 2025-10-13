import React from "react";

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
  return (
    <section className="px-6">
       <h2 className="font-alta text-center font-serif text-3xl md:text-4xl text-[#364028] mb-4">
          Understanding <span className="italic font-semibold">Cell Regeneration</span>
        </h2>
      <div className="max-w-6xl mx-auto bg-[#fbfaf8] rounded-3xl shadow-sm p-12 md:p-16">

        <p className="font-helvetica text-center text-gray-700 text-base md:text-lg !mb-12">
          Cell get damaged from free radicals. It’s coming from many sources:
        </p>

        {/* 2 Rows × 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-4xl mx-auto mb-16">
          {sources.map((source) => (
            <div
              key={source}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#f1eee7] rounded-xl border border-gray-200 shadow-inner"></div>
              <span className="mt-3 text-sm text-gray-700">{source}</span>
            </div>
          ))}
        </div>

        {/* Image + Text below right */}
        <div className="max-w-5xl mx-auto">
        <div className="relative w-full">
          <img
            src="/image/product/cell-regenerator.png"
            alt="Human Regenerator Technology"
            className="rounded-2xl w-full object-cover shadow-lg"
          />

          {/* Full overlay gradient: black → white */}
          <div className="absolute inset-0 bg-gradient-to-l from-black via-gray-700 to-white opacity-50 rounded-2xl mix-blend-multiply"></div>
        </div>


        {/* Image + Text inside (bottom-right overlay) */}
        <div className="relative max-w-5xl mx-auto">

          {/* Text overlay inside image */}
          <div className="absolute bottom-6 right-6 text-white rounded-xl p-6 md:w-1/3 z-10">
            <p className="font-helvetica text-white text-base md:text-lg leading-relaxed">
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

      </div>
    </section>
  );
};

export default Understanding;
