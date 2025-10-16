"use client";

import React, { useEffect } from "react";
import JourneyStep from "./JourneyStep";
import { Cormorant_Garamond, Roboto } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

interface Step {
  id: number;
  number: number;
  imageUrl: string;
  caption: string;
  description: string;
}

interface JourneyProps {
  steps: Step[];
}

const Journey: React.FC<JourneyProps> = ({ steps }) => {
  const topRowSteps = steps.slice(0, 3);
  const bottomRowSteps = steps.slice(3, 5);

  // Optional: enable hover-like behavior for touch
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      // Example: if the touched element has a hoverable class
      if (target.closest(".journey-step")) {
        target.classList.add("touch-active");
        setTimeout(() => {
          target.classList.remove("touch-active");
        }, 500); // 0.5s feedback
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <div className="container w-full mx-auto">
      <div className="flex flex-col items-center gap-2 md:gap-2">
        {/* Title */}
        <h2
          className={`font-alta py-6 text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-center text-[#768c43] w-full lg:w-[60%] mx-auto`}
        >
          Start Your Longevity Journey
        </h2>

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full p-4 md:p-0 justify-center">
          {topRowSteps.map((step) => (
            <div key={step.id} className="journey-step">
              <JourneyStep {...step} />
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-0 md:mt-6 justify-center p-4 md:p-0">
          {bottomRowSteps.map((step) => (
            <div key={step.id} className="journey-step">
              <JourneyStep {...step} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Journey;
