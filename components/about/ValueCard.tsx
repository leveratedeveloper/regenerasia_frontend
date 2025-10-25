"use client";

import React, { useState, useEffect } from "react";

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
  const [isTapped, setIsTapped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    if (isMobile) setIsTapped(!isTapped);
  };

  // ✅ Define active for desktop hover or mobile tap
  const active = isHovered || (isMobile && isTapped);

  const cardClasses = `
    relative duration-700 
    rounded-2xl overflow-hidden shadow-md
    bg-cover bg-center cursor-pointer
    ${isMobile ? "h-[280px]" : "h-[420px]"}
    w-full
    ${active && !isMobile ? "scale-[1.00]" : "scale-100"}
  `;

  const overlayClasses = `
    absolute inset-0 bg-black
    transition-opacity duration-500 ease-in-out
    ${active ? "opacity-70" : "opacity-40"}
  `;

  const cardStyle: React.CSSProperties = {
    backgroundImage: `url(${value.imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    margin: isMobile ? "0" : active ? "10px" : "5px",
  };

  return (
    <div
      className={cardClasses}
      style={cardStyle}
      onMouseEnter={!isMobile ? onMouseEnter : undefined}
      onMouseLeave={!isMobile ? onMouseLeave : undefined}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Learn more about ${value.title}`}
    >
      <div className={overlayClasses}></div>

      {/* ✅ Text content */}
      <div
        className="
          absolute inset-0 z-10 flex flex-col items-center justify-end
          text-white text-center px-3 sm:px-6 pb-6 sm:pb-10 text-justify
        "
      >
        <div
          className="
            flex flex-col justify-between items-center
            h-[100px] sm:h-[160px] md:h-[180px]
            transition-all duration-500 ease-in-out
          "
        >
          {/* ✅ Title */}
          <h3
            className={`
              font-semibold text-lg sm:text-xl leading-snug tracking-tight
              text-white drop-shadow-lg transition-all duration-500 ease-in-out
              ${
                isMobile
                  ? isTapped
                    ? "opacity-0 translate-y-3" // hide on tap (mobile)
                    : "opacity-100 -translate-y-3" // visible default (mobile)
                  : isHovered
                  ? "opacity-0 -translate-y-4" // move slightly up on hover (desktop)
                  : "opacity-100 translate-y-0" // default (desktop)
              }
            `}
          >
            {value.title}
          </h3>


          {/* ✅ Description */}
          <div
            className={`
              text-gray-200 font-light
              text-xs sm:text-sm md:text-base
              max-w-[90%] sm:max-w-[80%] md:max-w-md
              leading-relaxed
              transition-all duration-500 ease-in-out
              ${
                active
                  ? isMobile
                    ? "opacity-100 -translate-y-40" // mobile tap
                    : "opacity-100 -translate-y-45" // desktop hover
                  : "opacity-0 translate-y-3" // default hidden
              }
            `}
            style={{
              pointerEvents: active ? "auto" : "none",
              lineHeight: "1em",
            }}
          >
            <div
              className="overflow-y-auto pr-2 max-h-[340px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#6b7280 transparent",
              }}
            >
              {value.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
