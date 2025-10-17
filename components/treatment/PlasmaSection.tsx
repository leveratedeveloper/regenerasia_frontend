import React from 'react';
import LeafIcon from './Leaficon';

interface PlasmaItemProps {
  title: string;
  children: React.ReactNode;
}

const PlasmaItem: React.FC<PlasmaItemProps> = ({ title, children }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 pt-1">
      <LeafIcon className="w-6 h-6 text-[#2A402E]" />
    </div>
    <div>
      <h4 className="font-bold text-lg text-[#2A402E]">{title}</h4>
      <p className="text-gray-600">{children}</p>
    </div>
  </div>
);

const PlasmaSection: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center p-4 md:p-8">
      {/* Left side: Title and description */}
      <div className="lg:w-1/3 text-center lg:text-left">
        <h3 className="text-3xl lg:text-4xl font-bold mb-4">
          What is Plasma and Cold Atmospheric Plasma?
        </h3>
        <p className="text-gray-600">
          In the Human Regenerator Power Jet, CAP is created by applying a controlled electrical charge to air, producing a therapeutic mix of:
        </p>
      </div>

      {/* Vertical Divider - visible on large screens */}
      <div className="w-full lg:w-px lg:self-stretch h-px lg:h-auto bg-gray-300 my-4 lg:my-0 lg:mx-4"></div>


      {/* Right side: List of plasma items */}
      <div className="lg:w-2/3 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <PlasmaItem title="Electrons">
            Free-moving, negatively charged particles that stimulate cellular activity.
          </PlasmaItem>
          <PlasmaItem title="Anions (Negative Ions)">
            Oxygen molecules with extra electrons that help neutralise oxidative stress and support cellular balance.
          </PlasmaItem>
          <PlasmaItem title="Reactive Oxygen and Nitrogen Species (RONS)">
            Naturally occurring molecules that, in controlled amounts, promote cell repair, immune function, and tissue regeneration.
          </PlasmaItem>
          <PlasmaItem title="Static Electric Fields">
            Subtle electrical forces that influence cellular membranes, improving ion exchange and optimising cellular communication.
          </PlasmaItem>
        </div>
      </div>
    </section>
  );
};

export default PlasmaSection;
