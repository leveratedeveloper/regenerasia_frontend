"use client";

import React, { useState } from "react";

export interface Value {
  title: string;
  imageUrl: string;
  description: string;
}

interface ValueCardProps {
  value: Value;
  isHovered: boolean;
  isAnyHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const ValueCard: React.FC<ValueCardProps> = ({
  value,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Detect mobile tap toggle
  const [isTapped, setIsTapped] = useState(false);

  const handleClick = () => {
    // Only trigger on mobile
    if (window.innerWidth < 640) {
      setIsTapped(!isTapped);
    }
  };

  const active = isHovered || isTapped;

  const cardClasses = `
    relative transition-all duration-700 ease-in-out
    rounded-2xl overflow-hidden shadow-lg
    bg-cover bg-center cursor-pointer
    h-[220px] sm:h-[450px]
    sm:flex-grow
    ${active ? "sm:flex-[4] sm:scale-[1.02]" : "sm:flex-[1]"}
  `;

  const overlayClasses = `
    absolute inset-0 bg-black
    transition-opacity duration-500 ease-in-out
    ${active ? "opacity-70" : "opacity-40"}
  `;

  const cardStyle: React.CSSProperties = {
    marginLeft: active ? "10px" : "5px",
    marginRight: active ? "10px" : "5px",
    backgroundImage: `url(${value.imageUrl})`,
  };

  return (
    <div
      className={cardClasses}
      style={cardStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Learn more about ${value.title}`}
    >
      <div className={overlayClasses}></div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6">
        {/* Title always visible */}
        <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">{value.title}</h2>

        {/* Description fades in on hover/tap */}
        <p
          className={`text-gray-200 text-sm sm:text-base max-w-xs sm:max-w-sm transition-all duration-500 ease-in-out ${
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            pointerEvents: active ? "auto" : "none",
          }}
        >
          {value.description}
        </p>
      </div>
    </div>
  );
};
