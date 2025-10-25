"use client";
import React from "react";

const sources = [
  {
    img: "/image/treatment/icons/Cold_Atmospheric_Plasma.png",
    description: "Get the benefits of Cold Atmospheric Plasma",
  },
  {
    img: "/image/treatment/icons/Cellular_regeneration.png",
    description: "Cellular regeneration",
  },
  {
    img: "/image/treatment/icons/Strengthening_Immune_System.png",
    description: "Strengthening Immune System",
  },
  {
    img: "/image/treatment/icons/Exelerate_Recovery.png",
    description: "Exelerate Recovery.",
  },
  {
    img: "/image/treatment/icons/Aids_Quality_of_Sleep.png",
    description: "Aids Quality of Sleep",
  },
  {
    img: "/image/treatment/icons/Enhance_Energy_Level.png",
    description: "Enhance Energy Level",
  },
  {
    img: "/image/treatment/icons/Support_Anti_Aging.png",
    description: "Support Anti Aging",
  },
];

const Understanding: React.FC = () => {
  return (
    <section className="px-1">
      <h2 className="font-heveltica text-center text-3xl md:text-4xl text-[#364028] mb-6">
        Understanding{" "}
        <span className="font-heveltica font-semibold">
          Cell Regeneration
        </span>
      </h2>

      <div className="container relative w-full mx-auto bg-[#fbfaf8] rounded-2xl shadow-sm p-6 md:p-16">
        <p className="font-heveltica text-center text-gray-700 text-base md:text-lg mb-10 md:mb-12">
          Cells get damaged from free radicals. They come from many sources:
        </p>

        {/* Grid for image + description */}
        <div className="font-heveltica grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-6 max-w-5xl mx-auto mb-12 md:mb-16 mt-8">
        {sources.map((source, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4"
          >
            {/* Logo image */}
            <img
              src={source.img}
              alt={`Icon ${index + 1}`}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
            />

            {/* Vertical Divider */}
            <div className="hidden sm:block w-px h-15 bg-gray-800"></div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 mt-5 sm:mt-0">
              {source.description}
            </p>
          </div>
        ))}
      </div>

      </div>

      {/* Bottom image section */}
      <div className="relative w-full text-white overflow-hidden rounded-xl md:rounded-2xl shadow-2xl mt-10">
        <img
          src="/image/product/CAP_product-treatment.webp"
          alt="A serene, high-tech wellness clinic environment with a person receiving treatment"
          className="w-full h-full object-cover absolute inset-0 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>

        <div className="relative flex flex-col justify-center min-h-[60vh] md:min-h-[70vh] p-6 sm:p-10 md:p-16 lg:p-24">
          <div className="max-w-md lg:max-w-lg">
            <p className="font-heveltica mt-6 sm:text-5xl md:text-xl text-gray-50 leading-relaxed">
              Cold Atmospheric Plasma (CAP) is the "fourth state of matter," a
              room-temperature ionized gas known for its cellular regenerative
              properties. While standard CAP is used on the skin's surface, our
              Regeneresia Human Regenerator uses a specialized, softer CAP+ with
              smaller particles that penetrate deep into the tissue to treat the
              entire body.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Understanding;
