import React from 'react';
import ExpertCard from './ExpertCard';

export interface ExpertItem {
  name: string;
  title: string;
  imageUrl: string;
  description?: string;
}

interface ExpertsSectionProps {
  sectionTitle?: string;
  subtitle?: string;
  experts?: ExpertItem[];
}

const defaultExperts: ExpertItem[] = [
  {
    name: 'Dr. Pande Putu Agus Mahendra, M.Gizi, Sp.GK',
    title: 'Medical Advisor',
    description:
      'Dr. Pande provides the critical medical foundation for all our programs. As a Specialist in Clinical Nutrition, his expertise ensures that our treatments are integrated with a holistic approach to wellness, focusing on how cellular health, nutrition, and lifestyle intertwine. He is committed to validating the scientific integrity and safety of the Cold Atmospheric Plasma+ (CAP+) technology, ensuring every treatment plan is medically sound and tailored for optimal regenerative results.',
    imageUrl: '/image/doctor/dr-pande.webp',
  },
  {
    name: 'Kharisma Hidayat',
    title: 'Founder',
    imageUrl: '/image/doctor/bukharisma.webp',
    description:
      'Kharisma Hidayat is the visionary force behind Regenerasia. Driven by a passion for longevity and advanced technology, she was instrumental in introducing the first COLD ATMOSPHERIC PLASMA+ TECHNOLOGY in Asia. Her commitment lies in revolutionizing the Indonesian wellness industry by providing non-invasive, evidence-based tools that empower people to proactively manage their aging process and extend their active, healthy years.',
  },
];

const ExpertsSection: React.FC<ExpertsSectionProps> = ({
  sectionTitle = 'Team Member',
  subtitle = 'Our multidisciplinary team brings together decades of experience in regenerative medicine, respiratory therapy, and holistic healing.',
  experts,
}) => {
  const items = experts && experts.length > 0 ? experts : defaultExperts;

  return (
    <div className="container mx-auto px-4 py-12 md:py-12">
      <h2 className="font-alta text-4xl md:text-5xl text-center text-[#2f332f] mb-4">
        <b>{sectionTitle.toUpperCase()}</b>
      </h2>
      <h4 className="font-helvetica text-center text-gray-600 max-w-2xl mx-auto mb-7">
        {subtitle}
      </h4>

      <div className={`grid grid-cols-1 gap-8 min-h-[650px] rounded-xl overflow-hidden ${
        items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
      }`}>
        {items.map((expert, index) => (
          <ExpertCard key={index} {...expert} />
        ))}
      </div>
    </div>
  );
};

export default ExpertsSection;
