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
  {
    name: 'Nova Audianto',
    title: 'General Manager',
    imageUrl: '/image/doctor/pak-nova.webp',
    description:
    'As General Manager, Nova ensures the seamless operation and adherence to international standards of excellence across all Regenerasia services. His focus is on client experience, ensuring that every interaction, from consultation to post-treatment care, is professional, comfortable, and highly effective. He is dedicated to building a brand synonymous with trust, quality, and pioneering regenerative health in Indonesia.',
  },
  // {
  //   name: 'Dr. James Liu',
  //   title: 'Inflammation Research Lead',
  //   imageUrl: '/image/doctor/doctor4.webp',
  //   description:
  //   '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
  // },
  // {
  //   name: 'Lisa Thompson',
  //   title: 'Senior Nurse Practitioner',
  //   imageUrl: '/image/doctor/doctor5.webp',
  //   description:
  //   '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
  // },
  // {
  //   name: 'Lisa Park',
  //   title: 'Wellness Coordinator',
  //   imageUrl: '/image/doctor/doctor6.webp',
  //   description:
  //   '15 years of experience in cellular therapy and anti-aging medicine. Published researcher with 47 peer-reviewed papers on regenerative healing protocols.',
  // },
];

const ExpertsSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-12">
      <h2 className={`font-alta text-4xl md:text-5xl text-center text-[#4a442d] mb-4 `}>
       <b>TEAM MEMBER </b>
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
