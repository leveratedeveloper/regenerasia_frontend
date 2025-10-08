import React from 'react';
import ExpertCard from './ExpertCard';

const experts = [
  {
    name: 'Dr. Sarah Chen',
    title: 'Chief Medical Officer',
    description:
      '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
    imageUrl: 'https://picsum.photos/seed/expert1/400/500',
  },
  {
    name: 'Dr. Emily Watson',
    title: 'Sports Medicine Director',
    imageUrl: 'https://picsum.photos/seed/expert2/400/500',
    description:
    '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
  },
  {
    name: 'Dr. Michael Rodriguez',
    title: 'Respiratory Specialist',
    imageUrl: 'https://picsum.photos/seed/expert3/400/500',
    description:
    '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
  },
  {
    name: 'Dr. James Liu',
    title: 'Inflammation Research Lead',
    imageUrl: 'https://picsum.photos/seed/expert4/400/500',
    description:
    '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
  },
  {
    name: 'Lisa Thompson',
    title: 'Senior Nurse Practitioner',
    imageUrl: 'https://picsum.photos/seed/expert5/400/500',
    description:
    '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
  },
  {
    name: 'Lisa Park',
    title: 'Wellness Coordinator',
    imageUrl: 'https://picsum.photos/seed/expert6/400/500',
    description:
    '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
  },
];

const ExpertsSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h2 className="text-4xl md:text-5xl font-serif text-center text-[#4a442d] mb-4">
        Our Dedicated Experts
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Our multidisciplinary team brings together decades of experience in regenerative medicine, respiratory therapy, and holistic healing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[650px] rounded-xl overflow-hidden gap-8">
        {experts.map((expert, index) => (
          <ExpertCard key={index} {...expert} />
        ))}
      </div>
    </div>
  );
};

export default ExpertsSection;
