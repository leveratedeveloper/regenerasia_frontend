import React from 'react';
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

interface JourneyStepProps {
  imageUrl: string;
  caption: string;
  description: string;
}

const JourneyStep: React.FC<JourneyStepProps> = ({ imageUrl, caption, description }) => {
  return (
    <div className="flex flex-col items-center group relative w-full">
      {/* Image container */}
      <div className="w-full overflow-hidden rounded-2xl shadow-lg relative">
        <img
          src={imageUrl}
          alt={caption}
          className="w-full h-70 object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />

        {/* Overlay caption */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out">
          <p
            className={`${cormorant.className} text-sm md:text-[20px] lg:text-[23px] text-white text-center text-overlay`}
          >
            {description}
          </p>
        </div>
      </div>
      <h3 className={`${cormorant.className} text-xl md:text-[30px] lg:text-[33px] text-center`}> {caption} </h3>
    </div>
  );
};

export default JourneyStep;
