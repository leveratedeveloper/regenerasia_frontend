"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const PackagesSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const packages = [
    { title: "1 Session Package", description: "Rp5.000.000" },
    { title: "5 Session Packages", description: "Rp20.000.000" },
    { title: "10 Session Packages", description: "Rp40.000.000" },
  ];

  useEffect(() => {
    // Detect mobile screen size
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full rounded-2xl overflow-hidden shadow-2xl min-h-[550px] flex items-center justify-center p-6">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-cover bg-center" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/image/product/package_image-treatment.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 text-white text-center max-w-2xl mx-auto transition-all duration-500"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        <div className="border border-white/80 rounded-2xl px-8 py-10 md:px-24 md:py-14 backdrop-blur-sm transition-all duration-500">
          {/* Title */}
          <h3 className="font-alta text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Packages Available
          </h3>

          {/* Description */}
          <p
            className={`font-heveltica text-gray-200 text-sm sm:text-base max-w-md mx-auto transition-all duration-500 ease-in-out ${
              isHovered && !isMobile
                ? "translate-y-[-6px] opacity-60"
                : "translate-y-0 opacity-100"
            }`}
          >
            Cellular Regeneration is the ultimate tool for revitalization.
            Using CAP+ technology, this device acts as a Full Body Charger,
            delivering deep cellular support for comprehensive renewal and
            regeneration throughout your entire system.
          </p>

          {/* Accordion Section */}
          <div
            className={`mt-6 overflow-hidden transition-all duration-700 ease-in-out delay-100 ${
              isMobile || isHovered
                ? "max-h-[400px] opacity-100 translate-y-0"
                : "max-h-0 opacity-0 translate-y-4"
            }`}
          >
            <p className="font-heveltica text-lg font-semibold mb-3">
              This package includes:
            </p>

            <div className="font-heveltica bg-black/50 border border-white/40 rounded-xl divide-y divide-white/20 text-sm sm:text-base">
              {packages.map((pkg, index) => (
                <div key={index} className="p-3 md:p-4">
                  {/* Header */}
                  <button
                    className="flex justify-between items-center w-full text-white font-medium focus:outline-none"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h2>
                      <span>{pkg.title}</span>
                    </h2>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Content */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIndex === index
                        ? "max-h-60 mt-2 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {/* Description */}
                    <div className="text-gray-300 text-sm leading-relaxed mb-4">
                      {pkg.description}
                      <a
                        href={`/booking?package=${
                          pkg.title.includes("10")
                            ? 10
                            : pkg.title.includes("5")
                            ? 5
                            : pkg.title.includes("1")
                            ? 1
                            : 1
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[rgb(60,77,52)] text-white text-sm px-4 py-2 rounded-lg hover:bg-[rgba(60,77,52,0.8)] transition-all duration-300 float-right"
                      >
                        Book
                      </a>
                    </div>
                    {/* Book Button as a Link */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
