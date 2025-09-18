import React from 'react';
import { Cormorant_Garamond, Roboto } from "next/font/google";
import EnergizeStep from './EnergizeStep';


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

interface EnergizeProps {
  steps: Step[];
}

const Energize: React.FC<EnergizeProps> = ({ steps }) => {
  const topRowSteps = steps.slice(0, 3);
  const bottomRowSteps = steps.slice(3, 6);

  return (
    <div className="w-[98%] mx-auto">
    <div className="flex flex-col items-center gap-4 md:gap-4">
      {/* Title */}
      <h2
        className={`${cormorant.className} text-4xl md:text-5xl font-bold leading-[1.1] text-center text-[#3A3A3A]`}
      >
        <i>Energize</i> Your Body and Mind
      </h2>

      <p className={`${roboto.className} text-[20px] mb-4`}>
        Get the benefits of our program
      </p>
      {/* Top Row */}
      <div className={`${cormorant.className} grid grid-cols-1 md:grid-cols-3 gap-3 w-full`}>
        {topRowSteps.map((step) => (
          <EnergizeStep key={step.id} {...step} />
        ))}
      </div>
  
      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        {bottomRowSteps.map((step) => (
          <EnergizeStep key={step.id} {...step} />
        ))}
      </div>
    </div>
  </div>
  
  
  
  );
};

export default Energize;
