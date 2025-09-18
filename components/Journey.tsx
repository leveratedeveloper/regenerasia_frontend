import React from 'react';
import JourneyStep from './JourneyStep';
import { Cormorant_Garamond, Roboto } from "next/font/google";


const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // choose weights you need
    style: ["normal", "italic"], // aktifkan italic
});

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

interface Step {
  id: number;
  imageUrl: string;
  caption: string;
}

interface JourneyProps {
  steps: Step[];
}

const Journey: React.FC<JourneyProps> = ({ steps }) => {
  const topRowSteps = steps.slice(0, 3);
  const bottomRowSteps = steps.slice(3, 5);

  return (
    <div className="w-[98%] mx-auto">
    <div className="flex flex-col items-center gap-8 md:gap-12">
      {/* Title */}
      <h2 className={`${cormorant.className} text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] text-center text-[#3A3A3A] w-[100%] lg:w-[60%] mx-auto`}>
        Start Your Longevity Journey
      </h2>
  
      {/* Top Row */}
  
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full p-2 md:p-0 lg:p-0">
      {topRowSteps.map((step) => (
        <JourneyStep key={step.id} {...step} />
      ))}
    </div>

    {/* Bottom Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-0 md:mt-12 lg:mt-12 justify-center p-2 md:p-0 lg:p-0">
      {bottomRowSteps.map((step) => (
        <JourneyStep key={step.id} {...step} />
      ))}
    </div>

    </div>
  </div>
  
  
  
  );
};

export default Journey;
