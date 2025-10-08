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

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div className="text-white">
      <div className={`${roboto.className} text-3xl md:text-4xl font-semibold mb-1 `}>{value}</div>
      <div className={`${roboto.className} text-sm md:text-base text-white/80 tracking-wide `}>{label}</div>
    </div>
  );
};

export default StatItem;
