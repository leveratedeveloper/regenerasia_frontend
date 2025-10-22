"use client";
import React, { useState } from "react";
import { ValueCard } from "./ValueCard";

export interface Value {
  title: string;
  imageUrl: string;
  description: string;
}

const valuesData: Value[] = [
  {
    title: "Cellular Regeneration",
    imageUrl: "/image/aboutus/benefit/Cellular-Regeneration-about-mobile.jpg",
    description:
      "Our CAP technology stimulates reactive oxygen and nitrogen species (RONS) within the body. These molecules are essential for signaling cellular repair, promoting the growth of healthy new tissue, and ensuring your cells function optimally, accelerating the natural process of regeneration.",
  },
  {
    title: "Strengthening Immune System",
    imageUrl: "/image/aboutus/benefit/Immune-System-about-mobile.jpg",
    description:
      "Chronic inflammation is a leading cause of immune decline. CAP treatments are proven to help modulate inflammation and support a more balanced and robust immune response, preparing your body to better defend against illness and chronic conditions.",
  },
  {
    title: "Accelerate Recovery",
    imageUrl: "/image/aboutus/benefit/Accelerate-Recovery-about-mobile.jpg",
    description:
      "Whether you're recovering from intense exercise, injury, or daily stress, CAP works by boosting localized circulation and tissue repair signals. This targeted action helps to reduce downtime and aids your body in healing faster and more efficiently.",
  },
  {
    title: "Enhance Energy Level",
    imageUrl: "/image/aboutus/benefit/Enhance-energy-level-about-mobile.jpg",
    description:
      "By improving mitochondrial function (the energy powerhouses of your cells) and optimizing nutrient delivery through better circulation, our programs help reduce the fatigue associated with cellular stress. Experience a noticeable, sustainable increase in daily vitality and mental clarity.",
  },
  {
    title: "Aids Quality of Sleep",
    imageUrl: "/image/aboutus/benefit/Aids-Quality-of-Sleep-about-mobile.jpg",
    description:
      "Restorative sleep is the foundation of good health. CAP treatments help regulate key biological processes and calm the nervous system, making it easier to fall asleep, stay asleep, and achieve the deep, restful cycles necessary for physical and mental recovery.",
  },
  {
    title: "Support Anti-Aging",
    imageUrl: "/image/aboutus/benefit/Support-anti-aging-about-mobile.jpg",
    description:
      "The core of our CAP philosophy is extending the healthspan. By reducing oxidative stress, repairing DNA damage, and enhancing the overall regenerative capacity of your skin and tissues, our treatments work to proactively slow the biological signs of aging.",
  },
];

export const ValuesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto mt-20 px-4">
      <h1 className="font-alta text-4xl sm:text-5xl font-bold text-center mb-4 uppercase">
          Benefits of Cold Atmospheric Plasma Programs
      </h1>
      <p className="font-hevaltica text-lg text-center text-gray-800 mb-12 max-w-3xl mx-auto">
        These principles guide our actions and define who we are. Hover over each value to learn more.
      </p>

      {/* ✅ Responsive grid layout: 1 col (mobile), 3 cols (desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {valuesData.map((value, index) => (
          <ValueCard
            key={index}
            value={value}
            isHovered={hoveredIndex === index}
            isAnyHovered={hoveredIndex !== null}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </div>
  );
};
