"use client";

import React, { useState, useEffect } from "react";

interface PackagesSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  waUrl?: string;
  bgImage?: string;
}

const PackagesSection: React.FC<PackagesSectionProps> = ({
  title = "ELEVATE YOUR EXPERIENCE",
  description = "Cellular Regeneration is the ultimate tool for revitalization. Using CAP+ technology, this device acts as a Full Body Charger, delivering deep cellular support for comprehensive renewal and regeneration throughout your entire system.",
  buttonText = "Connect Now",
  waUrl = "https://wa.me/6281117019888?text=Hello%20Regenerasia%20Team!",
  bgImage,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bgStyle = bgImage
    ? { backgroundImage: `url(${bgImage})` }
    : {};

  return (
    <section className="relative w-full rounded-2xl overflow-hidden shadow-2xl min-h-[550px] flex items-center justify-center p-6">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={bgImage ? bgStyle : { backgroundImage: "url('/image/product/package_image-treatment.webp')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 text-white text-center max-w-2xl mx-auto transition-all duration-500"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        <div className="border border-white/80 rounded-2xl px-8 py-10 md:px-24 md:py-14 backdrop-blur-sm transition-all duration-500">
          <h3 className="font-alta text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {title}
          </h3>

          <p
            className={`font-heveltica text-gray-200 text-sm sm:text-base max-w-md mx-auto transition-all duration-500 ease-in-out ${
              isHovered && !isMobile
                ? "translate-y-[-6px] opacity-60"
                : "translate-y-0 opacity-100"
            }`}
          >
            {description}
          </p>

          <div
            className={`mt-6 overflow-hidden transition-all duration-700 ease-in-out delay-100 ${
              isMobile || isHovered
                ? "max-h-[200px] opacity-100 translate-y-0"
                : "max-h-0 opacity-0 translate-y-4"
            }`}
          >
            <p className="font-heveltica text-md font-semibold mb-6 py-4">
              Connect with a specialist today
            </p>
          </div>

          <a
            href={waUrl}
            className="font-helvetica px-5 py-2.5 border border-white/40 rounded-md text-[16px] sm:text-[18px] md:text-[20px] text-white hover:bg-white/10 transition drop-shadow-lg backdrop-blur-[24px] mt-5"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
