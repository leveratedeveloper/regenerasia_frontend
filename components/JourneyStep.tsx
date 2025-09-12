
import React from 'react';

interface JourneyStepProps {
  imageUrl: string;
  caption: string;
}

const JourneyStep: React.FC<JourneyStepProps> = ({ imageUrl, caption }) => {
  return (
    <div className="flex flex-col items-center group">
      <div className="w-full overflow-hidden rounded-2xl rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
        <img
          src={imageUrl}
          alt={caption}
          className="w-full h-64 object-cover"
        />
      </div>
      <p className="mt-6 text-xl font-serif-display text-center text-gray-700">
        {caption}
      </p>
    </div>
  );
};

export default JourneyStep;
