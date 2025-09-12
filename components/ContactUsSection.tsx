import React from "react";

const ContactUsSection = () => {
  const imageData = {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1920&q=80",
    alt: "A serene lake surrounded by lush green forests and mountains in the background under a cloudy sky."
  };

  return (
    <main className="relative bg-[#F7F3EE] rounded-2xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* Left: Image */}
        <div className="w-full h-full">
          <img
            src={imageData.src}
            alt={imageData.alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Content */}
        <div className="flex items-center justify-center p-10 bg-white">
          <section className="text-left max-w-md">
            <h1 className="text-4xl font-serif font-bold text-gray-900 leading-snug">
              Regenerate with <br />
              Regenerasia <span className="italic text-green-800">Today</span>
            </h1>

            <p className="mt-4 text-gray-600">
              Contact us to book sessions on the Human Regenerator or 
              to enquire about purchasing for your home or business.
            </p>

            <button className="mt-6 bg-green-900 text-white px-6 py-2 rounded-sm hover:bg-green-800 transition">
              Contact Us
            </button>
          </section>
        </div>
      </div>

      {/* Floating Edit Button */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <button
          className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
          aria-label="Edit section"
        >
        </button>
      </div>
    </main>
  );
};

export default ContactUsSection;
