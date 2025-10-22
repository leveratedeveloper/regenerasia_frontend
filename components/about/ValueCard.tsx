"use client";

import React from "react";

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
  const cardClasses = `
    relative transition-all duration-700 ease-in-out
    rounded-2xl overflow-hidden shadow-xl
    bg-cover bg-center cursor-pointer
    h-[200px] sm:h-[450px]
    sm:flex-grow
    ${isHovered ? "sm:flex-[4] sm:scale-[1.02]" : "sm:flex-[1]"}
  `;

  const overlayClasses = `
    absolute inset-0 bg-black
    transition-opacity duration-500 ease-in-out
    ${isHovered ? "opacity-70" : "opacity-40"}
  `;

  // ✅ Custom pixel-based margin
  const cardStyle: React.CSSProperties = {
    marginLeft: isHovered ? "10px" : "5px",
    marginRight: isHovered ? "10px" : "5px",
  };

  return (
    <div
      className={cardClasses}
      style={{ ...cardStyle, backgroundImage: `url(${value.imageUrl})` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`Learn more about ${value.title}`}
    >
      <div className={overlayClasses}></div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center px-6">
        {/* Title always visible */}
        <h2 className="text-3xl font-bold mb-4">{value.title}</h2>

        {/* Description fades in on hover */}
        <p
          className={`text-gray-200 text-base max-w-sm transition-opacity duration-500 ease-in-out ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {value.description}
        </p>
      </div>
    </div>
  );
};
