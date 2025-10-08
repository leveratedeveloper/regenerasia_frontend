import React from 'react';
import StatItem from './StatItem';
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
const LegacySection: React.FC = () => {
  const stats = [
    { value: '2,847', label: 'Patients Treated' },
    { value: '94%', label: 'Success Rate' },
    { value: '7', label: 'Years of Excellence' },
    { value: '15', label: 'Health Issues Fought' },
  ];

  return (
    <div className="container mx-auto px-4 pb-12 md:pb-24 mt-24">
      <div className="relative rounded-3xl overflow-hidden shadow-lg text-white">
        <img
          src="https://picsum.photos/seed/mountainsunrise/1600/900"
          alt="Mountain sunrise"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent"></div>

        <div className="relative flex justify-end p-8 sm:p-12 md:p-24">
          <div className="w-full max-w-lg text-right">
            {/* Title */}
            <h2 className={`font-alta text-5xl md:text-6xl mb-6 leading-tight `}>
              Our Legacy
            </h2>

            {/* Description */}
            <p className={`font-helvetica text-lg md:text-xl text-white/90 mb-16 leading-relaxed `}>
              Founded in 2018 by a team of visionary medical professionals, Regenerator has grown from a small clinic to a leading center for regenerative medicine, helping thousands reclaim their health.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 text-left justify-end">
              {stats.map((stat, index) => (
                <StatItem key={index} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegacySection;
