"use client"

import React, { useState, useEffect } from "react";

interface ExpertCardProps {
  imageUrl: string;
  name: string;
  title: string;
  description?: string;
}

const ExpertCard: React.FC<ExpertCardProps> = ({
  imageUrl,
  name,
  title,
  description,
}) => {
  const [isTouch, setIsTouch] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Detect touch devices (mobile/tablet)
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches
    ) {
      setIsTouch(true);
    }
  }, []);

  const toggleActive = () => {
    if (isTouch) {
      setIsActive((prev) => !prev);
    }
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-lg aspect-[4/5] group cursor-pointer transition-all duration-500 ease-in-out ${
        isActive ? "scale-[1.02]" : ""
      }`}
      onClick={toggleActive}
    >
      {/* Background image */}
      <img
        src={imageUrl}
        alt={`Portrait of ${name}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />

      {/* Blur gradient bawah */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-slate-900/90 via-slate-800/40 to-transparent transition-all duration-500 ${
          isActive ? "backdrop-blur-[8px]" : "group-hover:backdrop-blur-[8px]"
        }`}
      />

      {/* Text container */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white flex flex-col justify-end h-[90%]">
        {/* Title & subtitle */}
        <div
          className={`transition-all duration-500 ease-in-out 
          ${
            isActive
              ? "translate-y-[-40px] md:translate-y-[-70px]"
              : "group-hover:translate-y-[-40px] md:group-hover:translate-y-[-70px]"
          }`}
        >
          <h3 className="text-lg md:text-2xl font-alta mb-1">{name}</h3>
          <p className="text-xs md:text-sm text-white/90 font-helvetica mb-0">
            {title}
          </p>
        </div>

        {/* Description */}
        {description && (
          <p
            className={`text-xs md:text-sm text-white/90 font-helvetica mt-3 border-t border-white/20
            overflow-hidden max-h-0 opacity-0 translate-y-10 md:translate-y-20
            transition-all duration-500 ease-in-out delay-100
            ${
              isActive
                ? "opacity-100 translate-y-[-40px] md:translate-y-[-70px] max-h-[500px] md:max-h-[1000px]"
                : "group-hover:opacity-100 group-hover:translate-y-[-40px] md:group-hover:translate-y-[-70px] group-hover:max-h-[500px] md:group-hover:max-h-[1000px]"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ExpertCard;
