
import React from 'react';

const sources = [
  "Inflammation", "Smoking", "Air Pollution", "UV Light",
  "Metabolism", "Air Travel", "Poor Diet", "Toxins"
];

const Understanding: React.FC = () => {
  return (
    <section className="pt-48 md:pt-64 pb-16 md:pb-24 px-4">
      <div className="container mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">
          Understanding Cell Regeneration
        </h2>
        <p className="max-w-xl mx-auto text-lg mb-12">
          Cell get damaged from free radicals. It's coming from many sources:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-4xl mx-auto mb-20">
          {sources.map((source) => (
            <div key={source} className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
              <span className="text-sm">{source}</span>
            </div>
          ))}
        </div>
        <div className="relative max-w-5xl mx-auto">
          <img 
            src="https://picsum.photos/id/1015/1200/600"
            alt="Human Regenerator Technology"
            className="rounded-xl shadow-lg w-full"
          />
          <div className="md:absolute md:bottom-10 md:right-10 md:w-1/3 bg-white/80 backdrop-blur-sm p-6 rounded-lg text-left mt-4 md:mt-0">
            <p className="text-base text-brand-text">
              Cold Atmospheric Plasma technology counters free radicals by surrounding your body with a therapeutic blend of static energy, anions, and electrons.
              <br/><br/>
              It neutralizes free radicals at their source, empowering your body to shift from stress to a state of deep healing and vitality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Understanding;
