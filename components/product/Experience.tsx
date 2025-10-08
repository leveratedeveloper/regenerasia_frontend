
import React from 'react';

const Experience: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-12">
          The Regeneration Experience
        </h2>
        <div className="max-w-6xl mx-auto">
          <img 
            src="https://picsum.photos/id/431/1600/800"
            alt="The Regeneration Experience"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Experience;
