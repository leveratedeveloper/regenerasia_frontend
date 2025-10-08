import React from 'react';
import { Cormorant_Garamond, Roboto } from "next/font/google";


const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // choose weights you need
    style: ["normal", "italic"], // aktifkan italic
});

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300"],
});
interface InfoCardProps {
  imageUrl: string;
  category: string;
  title: string;
  description?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ imageUrl, category, title, description }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group aspect-[4/3]">
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />

      {/* Overlay gradient for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      {/* Blurred Bottom Content */}
      <div
        className="
          absolute bottom-0 w-full
          backdrop-blur-sm bg-black/40
          p-2 md:p-4 
          transition-all duration-500 ease-in-out 
          group-hover:-translate-y-6
        "
      >
        {/* Category */}
        <p className="text-sm text-white/80 font-sans uppercase tracking-wider">
          {category}
        </p>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl text-white/80 font-serif my-2 leading-tight">
          {title}
        </h2>

        {/* Description: hidden before hover */}
        {description && (
          <p
            className="
              text-base text-white/90 font-sans mt-2 max-w-md
              opacity-0 translate-y-2
              transition-all duration-500 ease-in-out
              group-hover:opacity-100 group-hover:translate-y-0
            "
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
