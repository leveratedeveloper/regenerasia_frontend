"use client";

import React, { useState, useEffect } from "react";
import { Cormorant_Garamond, Roboto } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300"],
});

interface InfoCardProps {
  imageUrl: string;
  category: string;
  title: string;
  description?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  imageUrl,
  category,
  title,
  description,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch devices
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      setIsTouch(true);
    }
  }, []);

  const toggleActive = () => {
    if (isTouch) {
      setIsActive(prev => !prev);
    }
  };

  return (
    <div
      // use touchstart for mobile, click fallback for desktop
      onTouchStart={isTouch ? toggleActive : undefined}
      onClick={!isTouch ? toggleActive : undefined}
      className={`
        relative rounded-xl overflow-hidden shadow-lg group
        cursor-pointer transition-all duration-500 ease-in-out
        aspect-[4/3] sm:aspect-[16/10] md:aspect-[3/2]
        ${isActive ? "scale-[1.02]" : ""}
      `}
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={title}
        className={`
          absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out
          ${isActive ? "scale-105" : "group-hover:scale-105"}
        `}
      />

      {/* Overlay gradient */}
      <div className="absolute bottom-0 left-0 w-full h-3/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      {/* Blurred Bottom Content */}
      <div
        className={`
          absolute bottom-0 w-full backdrop-blur-sm bg-black/40 
          p-3 md:p-5 
          transition-all duration-500 ease-in-out 
          ${isActive ? "-translate-y-6" : "group-hover:-translate-y-6"}
        `}
      >
        <p className={`text-xs md:text-sm text-white/70 uppercase tracking-wider ${roboto.className}`}>
          {category}
        </p>

        <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 my-2 leading-tight ${cormorant.className}`} >
          {title}
        </h2>

        {description && (
          <p
            className={`
              text-xs sm:text-sm md:text-base text-white/80 ${roboto.className}
              mt-3 border-t border-white/20 pt-3 
              overflow-hidden max-h-0 opacity-0 translate-y-3
              transition-all duration-500 ease-in-out delay-100
              ${isActive
                ? "opacity-100 translate-y-0 max-h-40"
                : "group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-40"}
            `}
            style={{ whiteSpace: "pre-line" }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
