
import React from 'react';

const Testimonial: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-8">
          "I wish I'd found this sooner"
        </h2>
        <div className="space-y-6 text-lg text-brand-text/80 mb-10">
          <p>
            Wow!! Where do I start! I was introduced to The Human Regenerator™ by the amazing Helen! I am suffering from severe endometriosis and after having finished my first course my symptoms are so much better and I really wish I could have known about this sooner.
          </p>
          <p>
            My energy has come back and I no longer need to take painkillers and this is only the beginning; I'm excited to see how my body continues to heal. Thank you Helen and Richie for all your knowledge and support on my journey. I am very grateful!!
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <img 
            src="https://picsum.photos/id/65/100/100" 
            alt="Sarah" 
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-lg text-brand-dark">Sarah, 56</p>
            <p className="text-brand-text/70">Borehamwood, Elstree</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
