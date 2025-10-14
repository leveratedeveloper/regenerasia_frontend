import React from "react";

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div className="text-white">
      <div className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-1 font-helvetica">
        {value}
      </div>
      <div className="text-xs sm:text-sm md:text-base text-white/80 tracking-wide font-helvetica">
        {label}
      </div>
    </div>
  );
};

export default StatItem;
