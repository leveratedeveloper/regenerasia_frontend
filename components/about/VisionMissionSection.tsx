import React from 'react';
import InfoCard from './InfoCard';

interface VisionMissionProps {
  sectionTitle?: string;
  vision?: {
    imageUrl?: string;
    title?: string;
    description?: string;
  };
  mission?: {
    imageUrl?: string;
    title?: string;
    description?: string;
  };
}

const VisionMissionSection: React.FC<VisionMissionProps> = ({
  sectionTitle = 'Our Vision and Mission',
  vision,
  mission,
}) => {
  const visionData = {
    imageUrl: vision?.imageUrl || '/image/aboutus/vission-image-about-us.webp',
    category: 'Vision',
    title: vision?.title || 'A Future of Limitless Vitality',
    description: vision?.description || 'To define the meaning of aging well by setting a new standard for precision longevity care that is rigorous in its science as it is exceptional in its experience.',
  };

  // Mission description is stored newline-separated — split into array for bullet list
  const missionDescLines = mission?.description
    ? mission.description.split('\n').filter(l => l.trim())
    : [
        'Introduce and Implement: To successfully introduce and implement the safest and most effective German-engineered Cold Atmospheric Plasma+ Technology across Indonesia.',
        'Educate and Empower: To educate our community on the importance of cellular health and provide personalized treatment protocols that promote longevity and combat age-related decline.',
        'Set the Standard: To maintain the highest international standards of safety, efficacy, and client care in all our regenerative programs.',
      ];

  const missionData = {
    imageUrl: mission?.imageUrl || '/image/aboutus/mission-image.webp',
    category: 'Mission',
    title: mission?.title || 'Pioneering Natural Pathways to Renewal',
    description: missionDescLines,
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h2 className="font-alta text-4xl md:text-5xl text-center text-[#2f332f] mb-12">
        <b>{sectionTitle}</b>
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
