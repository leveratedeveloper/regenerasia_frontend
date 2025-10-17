import React from 'react';

const DiagramBox: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div
    className={`bg-black/60 border border-white/80 rounded-xl px-5 py-3 text-center text-white text-base md:text-lg w-48 md:w-44 flex justify-center items-center ${className}`}
  >
    {children}
  </div>
);


const HealthSpanSection: React.FC = () => {
  return (
    <section className="relative w-full rounded-2xl overflow-hidden p-6 sm:p-8 md:p-12 shadow-2xl">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1681488122396-85a4208b9826?q=80&w=1974&auto=format&fit=crop')" }}
      ></div>
        <div className="absolute inset-0 bg-[url('/image/product/TheHealth.webp')] bg-cover bg-center bg-opacity-70"></div>
      
      <div className="relative z-10 text-white text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">The Health Span vs Life Span Gap</h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base">
          While modern medicine has helped extend life expectancy, the quality of those extra years hasn’t kept up. Ageing naturally comes with changes that can make everyday life harder:
        </p>
      </div>

      {/* Main container for diagram */}
      <div className="relative z-10 mt-12 lg:mt-20 flex items-center justify-center lg:h-[500px]">

        {/* --- DESKTOP LAYOUT (lg and up) --- */}
        <div className="hidden lg:block w-full h-full">
          {/* Decorative Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[420px] h-[420px] lg:w-[480px] lg:h-[480px]">
              <div className="absolute inset-0 border border-white/40 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="w-72 text-center text-white/90">
                  All these factors combined make these challenges even more difficult contributing to the gap between how long we live and how well we live.
                </p>
              </div>
            </div>
          </div>
          
          {/* Flexbox layout for the four boxes */}
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-y-42">
            <div className="flex justify-center w-full gap-x-40 lg:gap-x-56">
              <DiagramBox>Cellular<br/>Breakdown</DiagramBox>
              <DiagramBox>Oxidative Stress</DiagramBox>
            </div>
            <div className="flex justify-center w-full gap-x-40 lg:gap-x-56">
              <DiagramBox>Mitochondrial<br/>Decline</DiagramBox>
              <DiagramBox>Lifestyle &<br/>Environment</DiagramBox>
            </div>
          </div>
        </div>

        {/* --- MOBILE LAYOUT (up to lg) --- */}
        <div className="lg:hidden flex flex-col items-center justify-center gap-6 text-white text-center w-full py-8">
            <DiagramBox>Cellular<br/>Breakdown</DiagramBox>
            <DiagramBox>Oxidative Stress</DiagramBox>
            <p className="w-64 text-center text-white/90 my-4">
              All these factors combined make these challenges even more difficult contributing to the gap between how long we live and how well we live.
            </p>
            <DiagramBox>Mitochondrial<br/>Decline</DiagramBox>
            <DiagramBox>Lifestyle &<br/>Environment</DiagramBox>
        </div>
      </div>
    </section>
    
  );
};

export default HealthSpanSection;
