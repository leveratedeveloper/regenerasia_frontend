import type { Metadata } from "next";
import { getPageAbout } from "@/lib/api";
import OurMissionVision from "@/components/about/VisionMissionSection";
import ExpertsSection from "@/components/about/ExpertsSection";
import { ValuesSection } from "@/components/about/ValuesSection";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageAbout();
  return {
    title: page?.meta_title ?? "About Us - Regenerasia | Pioneering Longevity in Indonesia",
    description: page?.meta_description ?? "Learn about Regenerasia's mission to bring Cold Atmospheric Plasma+ technology to Indonesia.",
  };
}

export default async function AboutUsPage() {
  const page = await getPageAbout();

  const heroTitle        = page?.title ?? "About Us";
  const heroSubtitle     = page?.description_banner ?? "Recharge. Regenerate. Restart. With Regenerasia";
  const heroBanner       = page?.banner || "/image/aboutUs.webp";
  const heroBannerMobile = page?.banner_sub || "/image/aboutUs-mobile.webp";

  // Founder's Story
  const introImage = page?.about_intro_image || "/image/aboutus/wellness.webp";
  const introParagraphs: string[] = page?.about_intro_text
    ? page.about_intro_text.split('\n\n').filter((p: string) => p.trim())
    : [
        "High performance and health conscious individuals are growing in an unprecedented rate in Indonesia. Making effective, non-invasive, and safe options a requirement in order to maintain an individual's peak shape. Identifying the lack of options in Indonesia, regenerasia brings a cutting-edge technology quietly used by some of the most premium clinics and wellness centers all over the globe to Jakarta, Indonesia.",
        "Regenerasia is building the first longevity platform in Indonesia with the technology, the clinical credibility, the physical environment, and the commercial model to define what premium health investment looks like in this market for the future. Our ground-breaking Cold Atmospheric Plasma Plus (CAP+) technology is a non-invasive treatment, sourced from Germany, the global leader in biomedical engineering. Regenerating your body on cellular level to boost your mithocondrial efficiency, reduce inflammation, enhance cellular signaling, even to improve collagen synthesis.",
        "In a world where living longer is a universal desire, our focus is on ensuring you live healthier for longer, extending your healthspan. Regenerasia was founded on the belief that cutting-edge science should be accessible, providing powerful, non-invasive solutions for age-related health concerns.",
      ];

  // Vision & Mission
  const vision = {
    imageUrl: page?.image_vision || undefined,
    title:    page?.title_vision || undefined,
    description: page?.description_vision || undefined,
  };
  const mission = {
    imageUrl: page?.image_mission || undefined,
    title:    page?.title_mission || undefined,
    description: page?.description_mission || undefined,
  };

  // Benefits — 6 items from CMS
  const defaultBenefitImages = [
    '/image/aboutus/benefit/Cellular-Regeneration-about-mobile.webp',
    '/image/aboutus/benefit/Immune-System-about-mobile.webp',
    '/image/aboutus/benefit/accelerate-recovery.webp',
    '/image/aboutus/benefit/enhance-energy-level.webp',
    '/image/aboutus/benefit/aids-quality-of-sleep.webp',
    '/image/aboutus/benefit/support-anti-aging.webp',
  ];

  const benefits = page
    ? [1, 2, 3, 4, 5, 6].map((n, i) => ({
        title:       page[`title_${n}`] ?? '',
        imageUrl:    page[`img_${n}`]   || defaultBenefitImages[i],
        description: page[`desc_${n}`]  ?? '',
      })).filter(b => b.title)
    : [];

  // Team Members — up to 3 from CMS
  const defaultMemberImages = [
    '/image/doctor/dr-pande.webp',
    '/image/doctor/bukharisma.webp',
  ];

  const experts = page
    ? [1, 2, 3].map((n, i) => ({
        name:        page[`member_name_${n}`]  ?? '',
        title:       page[`member_title_${n}`] ?? '',
        imageUrl:    page[`member_image_${n}`] || defaultMemberImages[i],
        description: page[`member_desc_${n}`]  ?? '',
      })).filter(e => e.name)
    : [];

  return (
    <main className="relative z-1 bg-[#f4f1ea]">
      {/* Hero */}
      <section className="relative w-full h-screen bg-[#1c1917] flex items-center justify-left p-8 md:p-16">
        <div className="absolute inset-0 bg-gradient-to-br">
          <img
            src={heroBanner}
            alt="About Regenerasia"
            className="hidden md:block w-full h-full object-cover object-center"
          />
          <img
            src={heroBannerMobile}
            alt="About Regenerasia"
            className="block md:hidden w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-yellow-900/20" />
        </div>

        <div className="relative max-w-4xl w-full text-white/90">
          <div className="mb-6">
            <div className="flex items-center space-x-3 text-gray-300 italic text-lg">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7L2 17L12 22L22 17L22 7L12 2Z"></path>
              </svg>
              <span className="opacity-80">About Us</span>
            </div>
            <div className="w-25 h-px bg-gray-400/100 mt-2"></div>
          </div>
          <h1 className="font-alta text-4xl md:text-6xl text-white font-normal leading-tight mb-4">
            {heroTitle}
          </h1>
          <p className="font-helvetica text-base md:text-lg text-gray-300/90 leading-relaxed max-w-2xl">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="bg-[rgb(243,238,231)] py-12 md:py-14 px-1 md:px-3">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl">
          <div className="order-1 md:order-2 md:col-span-1 p-3 md:p-5">
            <img
              src={introImage}
              alt="Regenerasia wellness"
              className="rounded-2xl shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div className="order-2 md:order-1 text-zinc-700 mt-4 md:mt-8 p-3 md:p-5 text-justify">
            <div className="w-16 h-0.5 bg-zinc-600/80 mb-6 md:mb-8"></div>
            {introParagraphs.map((para, i) => (
              <p key={i} className="font-helvetica text-base leading-relaxed mb-4 md:mb-5">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[rgb(243,238,231)] py-12 md:py-12">
        <OurMissionVision
          sectionTitle={page?.vision_mission_title}
          vision={vision}
          mission={mission}
        />
        <ValuesSection
          title={page?.benefits_title}
          benefits={benefits.length > 0 ? benefits : undefined}
        />
        <ExpertsSection
          sectionTitle={page?.team_title}
          subtitle={page?.team_subtitle}
          experts={experts.length > 0 ? experts : undefined}
        />
      </section>
    </main>
  );
}
