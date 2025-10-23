"use client";
import React, { useState } from "react";

// Define DiagramBoxProps interface
interface DiagramBoxProps {
  children: React.ReactNode;
  className?: string;
  tooltip?: string;
  onMouseEnter?: () => void; // Prop to handle mouse enter
  onMouseLeave?: () => void; // Prop to handle mouse leave
}

/**
 * DiagramBox Component
 * A reusable box element for diagrams, featuring a tooltip
 * and hover interactions that can be controlled externally.
 */
const DiagramBox: React.FC<DiagramBoxProps> = ({
  children,
  className,
  tooltip,
  onMouseEnter, // Destructure the new prop
  onMouseLeave, // Destructure the new prop
}) => {
  // Internal state to manage tooltip visibility
  const [hovered, setHovered] = useState(false);

  // Combine internal state logic with external prop handlers
  const handleMouseEnter = () => {
    setHovered(true);
    if (onMouseEnter) {
      onMouseEnter(); // Call the passed-in handler
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (onMouseLeave) {
      onMouseLeave(); // Call the passed-in handler
    }
  };

  return (
    <div
      className={`relative bg-black/60 border border-white/80 rounded-xl px-5 py-3 text-center text-white text-base md:text-lg w-48 md:w-44 flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-black/80 ${className}`}
      onMouseEnter={handleMouseEnter} // Use combined handler
      onMouseLeave={handleMouseLeave} // Use combined handler
    >
      {children}

      {/* Tooltip */}
      {tooltip && (
        <div
          className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-56 bg-white text-black text-sm rounded-lg px-3 py-2 shadow-lg transition-all duration-300 ${
            hovered
              ? "opacity-100 translate-y-0" // Show tooltip
              : "opacity-0 translate-y-2 pointer-events-none" // Hide tooltip
          }`}
        >
          {tooltip}
          {/* Tooltip arrow */}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
};

/**
 * HealthSpanSection Component
 * Displays a diagram illustrating the gap between health span and life span,
 * with an interactive central circle that reacts to hovering over surrounding boxes.
 */
const HealthSpanSection: React.FC = () => {
  // State to manage the hover effect of the central circle
  const [circleHovered, setCircleHovered] = useState(false);

  return (
    <section className="relative w-full rounded-2xl overflow-hidden p-6 sm:p-8 md:p-12 shadow-2xl">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/image/product/Lifespan_Healthspan.webp')] bg-cover bg-center bg-opacity-70"></div>

      {/* Header Text */}
      <div className="relative z-10 text-white text-center max-w-4xl mx-auto">
        <h2 className="font-alta text-3xl sm:text-4xl lg:text-5xl mb-4">
          The Health Span vs Life Span Gap
        </h2>
        <p className="font-helvetica text-gray-300 max-w-3xl mx-auto text-sm sm:text-base">
          While modern medicine has helped extend life expectancy, the quality
          of those extra years hasn’t kept up. Ageing naturally comes with
          changes that can make everyday life harder:
        </p>
      </div>

      {/* Main container for diagram */}
      <div className="relative z-10 mt-12 lg:mt-20 flex items-center justify-center lg:h-[500px]">
        
        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden lg:block w-full h-full">
          
          {/* Interactive Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`relative w-[420px] h-[420px] lg:w-[480px] lg:h-[480px] rounded-full border border-white/40 flex items-center justify-center transition-all duration-500 ${
                circleHovered
                  ? "scale-105 shadow-[0_0_40px_rgba(255,255,255,0.5)] border-white/80" // Active state
                  : "scale-100 shadow-none" // Default state
              }`}
              // The circle can also be hovered directly
              onMouseEnter={() => setCircleHovered(true)}
              onMouseLeave={() => setCircleHovered(false)}
            >
              <p
                className={`font-helvetica w-72 text-center transition-colors duration-300 ${
                  circleHovered ? "text-white" : "text-white/80" // Text brightens on hover
                }`}
              >
                All these factors combined make these challenges even more
                difficult contributing to the gap between how long we live and
                how well we live.
              </p>
            </div>
          </div>

          {/* Four boxes around the circle */}
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-y-42">
            {/* Top row of boxes */}
            <div className="font-helvetica flex justify-center w-full gap-x-40 lg:gap-x-56">
              <DiagramBox
                tooltip="Damage to cell structures leading to aging and reduced regeneration."
                onMouseEnter={() => setCircleHovered(true)} // Activate circle on hover
                onMouseLeave={() => setCircleHovered(false)} // Deactivate circle on leave
              >
                Foundation to Cellular Balance
              </DiagramBox>
              <DiagramBox
                tooltip="An imbalance between free radicals and antioxidants in the body."
                onMouseEnter={() => setCircleHovered(true)} // Activate circle on hover
                onMouseLeave={() => setCircleHovered(false)} // Deactivate circle on leave
              >
                Initial Stress Defense Reset
              </DiagramBox>
            </div>
            {/* Bottom row of boxes */}
            <div className="font-helvetica flex justify-center w-full gap-x-40 lg:gap-x-56">
              <DiagramBox
                tooltip="Decline in mitochondrial function resulting in reduced energy levels."
                onMouseEnter={() => setCircleHovered(true)} // Activate circle on hover
                onMouseLeave={() => setCircleHovered(false)} // Deactivate circle on leave
              >
                Deep Cellular Charge
              </DiagramBox>
              <DiagramBox
                tooltip="External influences such as diet, stress, and environmental toxins."
                onMouseEnter={() => setCircleHovered(true)} // Activate circle on hover
                onMouseLeave={() => setCircleHovered(false)} // Deactivate circle on leave
              >
                Cellular Rejuvenate
              </DiagramBox>
            </div>
          </div>
        </div>

        {/* --- MOBILE LAYOUT --- */}
        <div className="lg:hidden flex flex-col items-center justify-center gap-6 text-white text-center w-full py-8">
          {/* Mobile layout doesn't have the interactive circle, just the boxes and text */}
          <DiagramBox tooltip="Damage to cell structures leading to aging and reduced regeneration.">
            <h3>Foundation to Cellular Balance</h3>
          </DiagramBox>
          <DiagramBox tooltip="An imbalance between free radicals and antioxidants in the body.">
            <h3>Initial Stress Defense Reset</h3>
          </DiagramBox>
          <p className="w-64 text-center text-white/90 my-4">
            All these factors combined make these challenges even more difficult
            contributing to the gap between how long we live and how well we
            live.
          </p>
          <DiagramBox tooltip="Decline in mitochondrial function resulting in reduced energy levels.">
            <h3>Deep Cellular Charge</h3>
          </DiagramBox>
          <DiagramBox tooltip="External influences such as diet, stress, and environmental toxins.">
            <h3>Cellular Rejuvenate</h3>
          </DiagramBox>
        </div>
      </div>
    </section>
  );
};

export default HealthSpanSection;