
import React from 'react';
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

interface EnergizeStepProps {
  imageUrl: string;
  caption: string;
}

const EnergizeStep: React.FC<EnergizeStepProps> = ({ imageUrl, caption }) => {
  return (
    <div className="flex flex-col items-center group">
      <div className="w-full overflow-hidden rounded-2xl rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
        <img
          src={imageUrl}
          alt={caption}
          className="w-full h-64 object-cover"
        />
      </div>
      <p className={`${cormorant.className} mt-2 mb-6  text-[35px] font-serif-display text-center text-gray-700`}>
        {caption}
      </p>
    </div>
  );
};

export default EnergizeStep;
