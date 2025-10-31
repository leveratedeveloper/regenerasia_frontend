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
      <h4 className={`font-helvetica font-bold text-lg text-[#2A402E]`}>{title}</h4>
      <p className={`font-helvetica text-gray-600`}>{children}</p>
    </div>
  </div>
);

const PlasmaSection: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center p-4 md:p-8">
      {/* Left side: Title and description */}
      <div className="lg:w-1/3 text-center lg:text-left">
        <h2 className={`font-alta text-3xl lg:text-4xl font-bold mb-4`}>
          Next-Generation CAP Technology
        </h2>
        <p className={`font-helvetica text-gray-600`}>
        Cold Atmospheric Plasma+ (CAP+)is engineered to restore your natural bioelectric balance. The device applies a precise electrical charge to air, creating a regenerative cocktail essential for cellular regeneration:
        </p>
      </div>

      {/* Vertical Divider - visible on large screens */}
      <div className="w-full lg:w-px lg:self-stretch h-px lg:h-auto bg-gray-300 my-4 lg:my-0 lg:mx-4"></div>


      {/* Right side: List of plasma items */}
      <div className="lg:w-2/3 w-full">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6`}>
          <PlasmaItem title="Electrons">
           Stimulate cell activity, effectively acting as the body's natural power source
          </PlasmaItem>
          <PlasmaItem title="Anions">
          Powerful negative ions that immediately reduce oxidative stress and restore balance.
          </PlasmaItem>
          <PlasmaItem title="RONS (Reactive Oxygen and Nitrogen Species)">
            Biologically active molecules that promote healing and bolster immune function.
          </PlasmaItem>
          <PlasmaItem title="Static Energy">
          Subtle fields that gently optimize how cells communicate and absorb nutrients.
          </PlasmaItem>
        </div>
      </div>
    </section>
  );
};

export default PlasmaSection;
