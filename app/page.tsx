import type { Metadata } from "next";
import { getPageHome } from "@/lib/api";
import HeroSection from "../components/HeroSection";
import Journey from '../components/Journey';
import Energize from "@/components/Energize";
import OutConsultant from "@/components/OutConsultant";
import ContactUsSection from "@/components/ContactUsSection";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageHome();
  return {
    title: page?.meta_title ?? "Regenerasia - Recharge, Regenerate, Restart",
    description: page?.meta_description ?? "Regenerasia introduces a new era of wellness and longevity to Indonesia with CAP+ Technology.",
  };
}

export default async function Home() {
  const page = await getPageHome();

  // Journey steps
  const journeySteps = [
    { id: 1, number: 1, imageUrl: page?.registration          ?? '/image/journey_1.webp', caption: page?.journey_caption_1 ?? 'Registration',               description: page?.registration_wording               ?? '' },
    { id: 2, number: 2, imageUrl: page?.health_screening       ?? '/image/journey_2.webp', caption: page?.journey_caption_2 ?? 'Health screening',            description: page?.health_screening_wording            ?? '' },
    { id: 3, number: 3, imageUrl: page?.analysis_by_consultant ?? '/image/journey_3.webp', caption: page?.journey_caption_3 ?? 'Analysis by Consultant',      description: page?.analysis_by_consultant_wording      ?? '' },
    { id: 4, number: 4, imageUrl: page?.treatment_program      ?? '/image/journey_4.webp', caption: page?.journey_caption_4 ?? 'Treatment Program',           description: page?.treatment_program_wording           ?? '' },
    { id: 5, number: 5, imageUrl: page?.program_report_consultant ?? '/image/journey_5.webp', caption: page?.journey_caption_5 ?? 'Program Report by Consultant', description: page?.program_report_consultant_wording   ?? '' },
  ];

  // Energize steps
  const energizeSteps = [
    { id: 1, imageUrl: page?.image_cellular_generation ?? '/image/cellular-regeneration.webp',    caption: page?.energize_caption_1 ?? 'Cellular Regeneration',       description: '' },
    { id: 2, imageUrl: page?.image_immune_system        ?? '/image/immune-system.webp',            caption: page?.energize_caption_2 ?? 'Strengthening Immune System', description: '' },
    { id: 3, imageUrl: page?.image_accelerate_recovery  ?? '/image/accelerate-recovery.jpg',       caption: page?.energize_caption_3 ?? 'Accelerate Recovery',         description: '' },
    { id: 4, imageUrl: page?.image_quality_of_sleep     ?? '/image/aids-quality-of-sleep.webp',    caption: page?.energize_caption_4 ?? 'Aids Quality of Sleep',       description: '' },
    { id: 5, imageUrl: page?.image_enhance_energy       ?? '/image/enhance-energy-level-new.webp', caption: page?.energize_caption_5 ?? 'Enhance Energy Level',        description: '' },
    { id: 6, imageUrl: page?.image_anti_aging           ?? '/image/support-anti-aging.webp',       caption: page?.energize_caption_6 ?? 'Support Anti Aging',         description: '' },
  ];

  const videoSrc = page?.link_cdn ?? "https://res.cloudinary.com/deyfby6ir/video/upload/v1774157893/regenerasia-new-video_rr19tp.mp4";

  return (
    <div className="relative text-white">
      <main className="relative z-1 bg-[#f4f1ea]">

        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center bg-black/40" id="first-section">
          <video
            className="absolute inset-0 w-full h-full object-cover -z-10"
            src={videoSrc}
            autoPlay muted loop playsInline
          />
          <HeroSection
            title={page?.hero_title}
            subtitle={page?.hero_subtitle}
            description={page?.hero_description}
            buttonText={page?.hero_button_text}
            buttonUrl={page?.hero_button_url}
            badges={page?.hero_badges}
          />
        </section>

        {/* Energize */}
        <section className="min-h-screen w-full bg-[#f4f1ea] text-[#768c43] flex flex-col items-center mt-8">
          <Energize steps={energizeSteps} title={page?.energize_title} />
        </section>

        {/* Consultant */}
        <section className="container w-[100%] mx-auto">
          <OutConsultant
            title={page?.consultant_title}
            name={page?.consultant_name}
            imageUrl={page?.our_consultant}
            description={page?.description}
          />
        </section>

        {/* Journey + CTA */}
        <section className="w-full bg-[#f4f1ea] text-[#768c43] flex flex-col items-center py-4 md:py-14">
          <Journey steps={journeySteps} title={page?.journey_title} />
          <ContactUsSection
            title={page?.cta_title}
            description={page?.cta_description}
            buttonText={page?.cta_button_text}
            buttonUrl={page?.cta_button_url}
            bgImage={page?.cta_bg_image}
          />
        </section>

      </main>
    </div>
  );
}
