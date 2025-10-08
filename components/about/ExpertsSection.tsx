import React from 'react';
import ExpertCard from './ExpertCard';
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


const experts = [
  {
    name: 'Dr. Sarah Chen',
    title: 'Chief Medical Officer',
    description:
      '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
    imageUrl: '/image/doctor/doctor1.webp',
  },
  {
    name: 'Dr. Emily Watson',
    title: 'Sports Medicine Director',
    imageUrl: '/image/doctor/doctor2.webp',
    description:
    '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
  },
  {
    name: 'Dr. Michael Rodriguez',
    title: 'Respiratory Specialist',
    imageUrl: '/image/doctor/doctor3.webp',
    description:
    '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
  },
  {
    name: 'Dr. James Liu',
    title: 'Inflammation Research Lead',
    imageUrl: '/image/doctor/doctor4.webp',
    description:
    '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
  },
  {
    name: 'Lisa Thompson',
    title: 'Senior Nurse Practitioner',
    imageUrl: '/image/doctor/doctor5.webp',
    description:
    '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
  },
  {
    name: 'Lisa Park',
    title: 'Wellness Coordinator',
    imageUrl: '/image/doctor/doctor6.webp',
    description:
    '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
  },
];

const ExpertsSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-12">
      <h2 className={`font-alta text-4xl md:text-5xl text-center text-[#4a442d] mb-4 `}>
       <b>Our <i>Dedicated</i> Experts</b>
      </h2>
      <h4 className={`font-helvetica text-center text-gray-600 max-w-2xl mx-auto mb-7`}>
        Our multidisciplinary team brings together decades of experience in <br/>regenerative medicine, respiratory therapy, and holistic healing.
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[650px] rounded-xl overflow-hidden gap-8">
        {experts.map((expert, index) => (
          <ExpertCard key={index} {...expert} />
        ))}
      </div>
    </div>
  );
};

export default ExpertsSection;
