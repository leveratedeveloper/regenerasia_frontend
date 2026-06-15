import React from 'react';
import LeafIcon from './Leaficon';

interface PlasmaItemProps {
  title: string;
  children: React.ReactNode;
}

const PlasmaItem: React.FC<PlasmaItemProps> = ({ title, children }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 pt-1">
      <LeafIcon className="w-10 h-9 text-[#2A402E]" />
    </div>
    <div>
      <h4 className="font-helvetica font-bold text-lg text-[#2A402E]">{title}</h4>
      <p className="font-helvetica text-gray-600">{children}</p>
    </div>
  </div>
);

interface TechFeature {
  feature_name: string;
  feature_desc: string;
}

interface PlasmaSectionProps {
  title?: string;
  intro?: string;
  features?: TechFeature[];
}

const defaultFeatures: TechFeature[] = [
  { feature_name: "Electrons",                                   feature_desc: "Stimulate cell activity, effectively acting as the body's natural power source" },
  { feature_name: "Anions",                                      feature_desc: "Powerful negative ions that immediately reduce oxidative stress and restore balance." },
  { feature_name: "RONS (Reactive Oxygen and Nitrogen Species)", feature_desc: "Biologically active molecules that promote healing and bolster immune function." },
  { feature_name: "Static Energy",                               feature_desc: "Subtle fields that gently optimize how cells communicate and absorb nutrients." },
];

const PlasmaSection: React.FC<PlasmaSectionProps> = ({
  title = "Next-Generation CAP+ Technology",
  intro = "Cold Atmospheric Plasma+ (CAP+) is engineered to restore your natural bioelectric balance. The device applies a precise electrical charge to air, creating a regenerative cocktail essential for cellular regeneration:",
  features,
}) => {
  const items = features && features.length > 0 ? features : defaultFeatures;

  return (
    <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center p-4 md:p-8">
      <div className="lg:w-1/3 text-center lg:text-left">
        <h2 className="font-alta text-3xl lg:text-4xl font-bold mb-4 text-[#2f332f]">
          {title}
        </h2>
        <p className="font-helvetica text-gray-600">{intro}</p>
      </div>

      <div className="w-full lg:w-px lg:self-stretch h-px lg:h-auto bg-gray-300 my-4 lg:my-0 lg:mx-4"></div>

      <div className="lg:w-2/3 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {items.map((f, i) => (
            <PlasmaItem key={i} title={f.feature_name}>
              {f.feature_desc}
            </PlasmaItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlasmaSection;
