
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
    imageUrl: '/image/aboutus/vission-image-about-us.webp',
    category: 'Vision',
    title: 'A Future of Limitless Vitality',
    description: ['To be the leading and most trusted authority in advanced healthspan and regenerative technology in Southeast Asia, empowering individuals to proactively manage their health and experience a life of vitality at every age.'],
  };
  
  const missionData = {
    imageUrl: '/image/aboutus/mission-image.webp',
    category: 'Mission',
    title: 'Pioneering Natural Pathways to Renewal',
    description: [
      'Introduce and Implement: To successfully introduce and implement the safest and most effective German-engineered Cold Atmospheric Plasma Technology across Indonesia.',
      'Educate and Empower: To educate our community on the importance of cellular health and provide personalized treatment protocols that promote longevity and combat age-related decline.',
      'Set the Standard: To maintain the highest international standards of safety, efficacy, and client care in all our regenerative programs.',
    ],
  };
    
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h2 className={`font-alta text-4xl md:text-5xl text-center text-[#4a442d] mb-12 `}>
        <b>Our Vision and Mission</b>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto">
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
          description={missionData.description}
        />
      </div>
    </div>
  );
};

export default VisionMissionSection;
