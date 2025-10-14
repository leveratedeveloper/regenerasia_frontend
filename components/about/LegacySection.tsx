import React from "react";
import StatItem from "./StatItem";
import { Cormorant_Garamond, Roboto } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400"],
});

const LegacySection: React.FC = () => {
  const stats = [
    { value: "2,847", label: "Patients Treated" },
    { value: "94%", label: "Success Rate" },
    { value: "7", label: "Years of Excellence" },
    { value: "15", label: "Health Issues Fought" },
  ];

  return (
    <div className="container mx-auto px-4 pb-12 md:pb-24 mt-16 md:mt-24">
      <div className="relative rounded-3xl overflow-hidden shadow-lg text-white">
        {/* Background image */}
        <img
          src="https://picsum.photos/seed/mountainsunrise/1600/900"
          alt="Mountain sunrise"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent"></div>

        {/* Content */}
        <div className="relative flex justify-center md:justify-end p-8 sm:p-12 md:p-24">
          <div
            className="
              w-full 
              max-w-lg 
              text-center md:text-left 
              transform 
              scale-[0.85] sm:scale-[0.9] md:scale-100 
              origin-center md:origin-right 
            "
          >
            {/* Title */}
            <h2
              className={`${cormorant.className} text-4xl sm:text-5xl md:text-[56px] leading-tight mb-4 md:mb-6`}
            >
              Our Legacy
            </h2>

            {/* Description */}
            <p
              className={`${roboto.className} text-[15px] sm:text-[17px] md:text-[18px] text-white/90 leading-relaxed mb-10 md:mb-14`}
            >
              Founded in 2018 by a team of visionary medical professionals,
              Regenerator has grown from a small clinic to a leading center for
              regenerative medicine, helping thousands reclaim their health.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-center md:text-left justify-center md:justify-end">
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
