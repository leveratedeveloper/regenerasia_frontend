"use client";
import React, { useState } from "react";
import { ValueCard } from "./ValueCard";

export interface BenefitItem {
  title: string;
  imageUrl: string;
  description: string;
}

interface ValuesSectionProps {
  title?: string;
  benefits?: BenefitItem[];
}

const defaultBenefits: BenefitItem[] = [
  {
    title: "Cellular Regeneration",
    imageUrl: "/image/aboutus/benefit/Cellular-Regeneration-about-mobile.webp",
    description:
      "Our CAP+ technology activates RONS molecules to signal instant cellular repair. It accelerates your body's natural regeneration, promoting the growth of healthy new tissue and optimizing cell function.",
  },
  {
    title: "Strengthening Immune System",
    imageUrl: "/image/aboutus/benefit/Immune-System-about-mobile.webp",
    description:
      "Combat chronic inflammation and immune decline with CAP+. This treatment modulates inflammatory responses and strengthens your immune system, helping your body defend against illnesses.",
  },
  {
    title: "Accelerate Recovery",
    imageUrl: "/image/aboutus/benefit/accelerate-recovery.webp",
    description:
      "Bounce back faster from exercise, injury, or daily stress. CAP+ boosts localized circulation and tissue repair signals, drastically reducing downtime and accelerating your body's healing process.",
  },
  {
    title: "Enhance Energy Level",
    imageUrl: "/image/aboutus/benefit/enhance-energy-level.webp",
    description:
      "Supercharge your energy at the source. By improving mitochondrial function and circulation, CAP+ reduces cellular fatigue to deliver a sustainable boost in daily vitality and mental clarity.",
  },
  {
    title: "Aids Quality of Sleep",
    imageUrl: "/image/aboutus/benefit/aids-quality-of-sleep.webp",
    description:
      "Restore your sleep cycle naturally. CAP+ treatments calm the nervous system and regulate key biological processes, helping you achieve the deep, restful sleep necessary for total recovery.",
  },
  {
    title: "Support Anti-Aging",
    imageUrl: "/image/aboutus/benefit/support-anti-aging.webp",
    description:
      "Extend your healthspan and slow down biological aging. CAP+ proactively combats aging by reducing oxidative stress, repairing DNA damage, and enhancing the regenerative capacity of your skin and tissues.",
  },
];

export const ValuesSection: React.FC<ValuesSectionProps> = ({
  title = "Benefits of Cold Atmospheric Plasma+ Programs",
  benefits,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const items = benefits && benefits.length > 0 ? benefits : defaultBenefits;

  return (
    <div className="w-full max-w-7xl mx-auto mt-20 px-4">
      <h1 className="font-alta text-4xl sm:text-5xl font-bold text-center mb-4 uppercase text-[#2f332f]">
        {title}
      </h1>
      <p className="font-heveltica text-lg text-center text-gray-800 mb-12 max-w-3xl mx-auto"></p>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full transition-all duration-700 ease-in-out">
        {items.map((value, index) => (
          <div
            key={index}
            className={`transition-[flex] duration-700 ease-in-out ${
              hoveredIndex === index
                ? "sm:flex-[2]"
                : hoveredIndex !== null
                ? "sm:flex-[1]"
                : "sm:flex-[1]"
            }`}
          >
            <ValueCard
              value={value}
              isHovered={hoveredIndex === index}
              isAnyHovered={hoveredIndex !== null}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
