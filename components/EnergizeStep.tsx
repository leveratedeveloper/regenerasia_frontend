
import React from 'react';


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
      <h3 className={`font-helvetica text-xl md:text-[20px] lg:text-[20px] text-center mt-2 text-stone-700`}> {caption} </h3>
    </div>

  );
};

export default EnergizeStep;
