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
    weight: ["300"],
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
  const topRowSteps = steps.slice(0, 6);
  const bottomRowSteps = steps.slice(3, 6);

  return (
    <div className="container w-[100%] mx-auto">
      <div className="flex flex-col items-center gap-2 md:gap-2">
        {/* Title */}
        <h2
          className={`${cormorant.className} text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] text-center text-[#768c43] w-[100%] lg:w-[60%] mx-auto`}
        >
          <i>Energize</i> Your Body and Mind
        </h2>

        <p className={`${roboto.className} text-[20px] mb-2 text-center`}>
          Get the benefits of Cold Atmospheric Plasma
        </p>
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full p-4 md:p-0 lg:p-0 justify-center">
          {topRowSteps.map((step) => (
            <EnergizeStep key={step.id} {...step} />
          ))}
        </div>
      </div>
  </div>
  
  
  
  );
};

export default Energize;
