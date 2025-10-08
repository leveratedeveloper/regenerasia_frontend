import React from 'react';

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div className="text-white">
      <div className={`font-helvetica text-3xl md:text-4xl font-semibold mb-1 `}>{value}</div>
      <div className={`font-helvetica text-sm md:text-base text-white/80 tracking-wide `}>{label}</div>
    </div>
  );
};

export default StatItem;
