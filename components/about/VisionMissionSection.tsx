
import React from 'react';
import InfoCard from './InfoCard';
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
const VisionMissionSection: React.FC = () => {
  const visionData = {
    imageUrl: 'https://picsum.photos/seed/sunrise/800/600',
    category: 'Vision',
    title: 'A Future of Limitless Vitality',
    description: 'We aspire to a world where advanced, accessible regenerative therapies empower every individual to live their fullest, healthiest lives, free from limitations.',
  };

  const missionData = {
    imageUrl: 'https://picsum.photos/seed/hiker/800/600',
    category: 'Mission',
    title: 'Pioneering Natural Pathways to Renewal',
    description: 'We aspire to a world where advanced, accessible regenerative therapies empower every individual to live their fullest, healthiest lives, free from limitations.',
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className={`${cormorant.className} text-4xl md:text-5xl font-serif text-center text-[#4a442d] mb-12 `}>
        Our Vision and Mission
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  mx-auto">
        <InfoCard
          imageUrl={visionData.imageUrl}
          category={visionData.category}
          title={visionData.title}
          description={visionData.description}
        />
        <InfoCard
          imageUrl={missionData.imageUrl}
          category={missionData.category}
          title={missionData.title}
          description={visionData.description}
        />
      </div>
    </div>
  );
};

export default VisionMissionSection;
