import type { Metadata } from "next";
import { getPageTreatment } from "@/lib/api";
import Behind from "@/components/treatment/Behind";
import PlasmaSection from "@/components/treatment/PlasmaSection";
import PackagesSection from "@/components/treatment/PackageSection";
import Understanding from "@/components/treatment/Understanding";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageTreatment();
  return {
    title: page?.meta_title ?? "Cold Atmospheric Plasma+ Treatment - Regenerasia | Jakarta",
    description: page?.meta_description ?? "Discover Cold Atmospheric Plasma+ (CAP+) treatment at Regenerasia. Non-invasive, German-engineered cellular regeneration therapy for longevity and wellness.",
  };
}

export default async function TreatmentPage() {
  const page = await getPageTreatment();

  const heroImage   = page?.treatment_image || "/image/product/human-regenerator.webp";
  const heroLabel   = page?.treatment_subtitle ?? "TREATMENT DETAILS";
  const heroTitle   = page?.treatment_main_title ?? "Cold Atmospheric Plasma+ Treatment";
  const heroDesc    = page?.treatment_description ?? "Discover the revolutionary treatments in our studio, where our personalized screening packages guide every stage of your health journey to optimize your life and extend your healthspan.";
  const scienceTitle = page?.science_main_title ?? "THE SCIENCE BEHIND REGENERATION";

  return (
    <main className="relative z-1 bg-[#f4f1ea]">
      {/* Hero */}
      <section className="relative w-full h-screen flex items-center justify-center text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-black opacity-40" />

        <div className="relative z-10 max-w-4xl px-6 text-center -translate-y-35">
          <div className="font-heveltica uppercase tracking-widest mb-4 text-gray-200">
            {heroLabel}
          </div>
          <h1 className="font-alta text-3xl md:text-5xl font-medium leading-tight text-white">
            {heroTitle}
          </h1>
          <p className="font-helvetica mt-3 text-md sm:text-xl text-gray-200 leading-relaxed">
            {heroDesc}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-[#f3eee7] py-16 md:py-20">
        <div className="bg-[#F5F1E9] min-h-screen text-[#2A402E] mx-auto py-8 md:py-16 px-1 sm:px-2 lg:px-3">
          <Understanding
            mainTitle={page?.main_title}
            subTitle={page?.sub_title}
            benefits={page?.cell_benefits}
            techDescription={page?.tech_description}
            techImage={page?.tech_image || undefined}
          />

          <main className="container mx-auto mt-20">
            <h1 className="font-alta text-4xl md:text-5xl font-bold text-center mb-8 md:mb-8 text-[#2f332f]">
              {scienceTitle}
            </h1>
            <div className="space-y-12 md:space-y-16">
              <Behind
                subtitle={page?.science_subtitle}
                description={page?.science_description}
                diagramPoints={page?.diagram_points}
                centerText={page?.center_text}
              />
              <PlasmaSection
                title={page?.tech_title}
                intro={page?.tech_intro}
                features={page?.tech_features}
              />
              <PackagesSection
                title={page?.package_main_title}
                description={page?.package_description}
                buttonText={page?.cta_button_text}
                waUrl={page?.cta_whatsapp_url}
                bgImage={page?.package_bg_image || undefined}
              />
            </div>
          </main>
        </div>
      </section>
    </main>
  );
}
