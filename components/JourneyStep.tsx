import React from 'react';

interface JourneyStepProps {
  number: number;
  imageUrl: string;
  caption: string;
  description: string;
}



const JourneyStep: React.FC<JourneyStepProps> = ({ number, imageUrl, caption, description }) => {
  return (
    <div className="flex flex-col items-center group relative w-full">
      {/* Image container */}
      <div className="w-full overflow-hidden rounded-2xl shadow-lg relative">
        {/* Number badge */}
      <div className="absolute top-3 left-3 text-white text-sm md:text-lg lg:text-xl w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full z-10" style={{background: 'rgba(0, 0, 0, 0.40)', backdropFilter: 'blur(50px)'}}>
        {number}
      </div>
        <img
          src={imageUrl}
          alt={caption}
          className="w-full h-70 object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out blur-hover"
        />
        {/* Overlay caption */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out blur-hover">
          <p
            className={`font-helvetica text-sm md:text-[20px] lg:text-[23px] text-white text-justify mx-4`}
            style={{ lineHeight: '1' }}
          >
            {description}
          </p>
        </div>
      </div>
      <h3 className={`font-helvetica text-xl md:text-[20px] lg:text-[20px] text-center mt-2 text-stone-700`}> {caption} </h3>
    </div>
  );
};

export default JourneyStep;
