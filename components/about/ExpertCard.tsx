import React from 'react';

interface ExpertCardProps {
  imageUrl: string;
  name: string;
  title: string;
  description?: string;
}

const ExpertCard: React.FC<ExpertCardProps> = ({
  imageUrl,
  name,
  title,
  description,
}) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/5] group cursor-pointer">
      {/* Background image */}
      <img
        src={imageUrl}
        alt={`Portrait of ${name}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />

      {/* Blur gradient hanya bawah */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-slate-900/90 via-slate-800/40 to-transparent transition-all duration-500 group-hover:backdrop-blur-[8px]" />
      {/* Text container */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end h-auto bg-gradient-to-t from-black/60 via-transparent to-transparent">
        {/* Always visible: Name + Title */}
        <div className="transition-all duration-500 ease-in-out">
          <h3 className="text-2xl font-alta mb-1">{name}</h3>
          <p className="text-sm text-white/90 font-helvetica mb-0">{title}</p>
        </div>

        {/* Hidden before hover, shows below */}
        {description && (
          <p
            className="text-sm text-white/80 font-helvetica mt-3 border-t border-white/20 pt-3
              opacity-0 translate-y-4
              transition-all duration-500 ease-in-out delay-100
              group-hover:opacity-100 group-hover:translate-y-0"
          >
            {description}
          </p>
        )}
      </div>

    </div>
  );
};

export default ExpertCard;
