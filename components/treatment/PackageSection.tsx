import React from 'react';

const PackagesSection: React.FC = () => {
  return (
    <section className="relative w-full rounded-2xl overflow-hidden shadow-2xl min-h-[550px] md:min-h-600px] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('')" }}
      ></div>
     <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/image/product/Package.webp')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-black/40"></div>
            </div>

      <div className="relative z-10 text-white text-center max-w-2xl mx-auto">
        <div className="border border-white/80 rounded-2xl px-8 py-10 md:px-24 md:py-14">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-serif">
            Packages Available
          </h3>
          <p className="text-gray-200 text-sm sm:text-base max-w-md mx-auto">
            Gain deeper clarity with detailed biomarker analysis, a 10-year risk score screening, and a doctor’s consultation to support your long-term well-being.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;