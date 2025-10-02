
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
    <div className="flex flex-col items-center group relative w-full">
      {/* Image container */}
      <div className="w-full overflow-hidden rounded-2xl shadow-lg relative">
        <img
          src={imageUrl}
          alt={caption}
          className="w-full h-70 object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out blur-hover"
        />
      </div>
      <h3 className={`${cormorant.className} text-xl md:text-[20px] lg:text-[23px] text-center`}> {caption} </h3>
    </div>

    // <div className="flex flex-col items-center group">
    //   <div className="w-full overflow-hidden rounded-2xl rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
    //     <img
    //       src={imageUrl}
    //       alt={caption}
    //       className="w-full h-70 object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
    //     />
    //   </div>
    //   <h3 className={`${cormorant.className} mt-2 text-xl md:text-[30px] lg:text-[33px] text-center text-gray-700`}>
    //     {caption}
    //   </h3>
    // </div>
  );
};

export default EnergizeStep;
