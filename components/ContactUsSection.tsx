import React from "react";
import { ArrowRight } from "lucide-react"; // optional icon library

const ContactUsSection = () => {
  const imageData = {
    src: "/image/bg_contact.webp",
    alt: "A serene lake surrounded by lush green forests and mountains in the background under a cloudy sky."
  };

  return (
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-[650px] rounded-xl overflow-hidden">
          {/* Left: Image (2/3 width on desktop) */}
          <div className="md:col-span-2 w-full h-full">
            <img
              src={imageData.src}
              alt={imageData.alt}
              className="w-full h-full object-cover object-center md:object-right"
            />
          </div>

          {/* Right: Content (1/3 width on desktop) */}
          <div className="md:col-span-1 flex flex-col justify-between p-6 md:p-10 lg:p-10 bg-white">
            {/* Text content */}
            <section className="text-left max-w-md">
              <h1 className="font-alta text-3xl md:text-4xl lg:text-4xl text-[#768c43] leading-snug">
                Regenerate with <br />
                Regenerasia Today
              </h1>

              <p className="font-helvetica text-justify mt-2 text-stone-700">
                Contact us to book sessions on the Human Regenerator or to enquire about purchasing for your home or business.
              </p>

              <a
                href="/booking"
                className="inline-block bg-green-900 rounded-xl text-white px-6 py-2 mt-4 hover:bg-green-800 transition"
              >
                Contact Us
              </a>
            </section>

            {/* Contact Info */}

          </div>
        </div>
      </div>
  );
};

export default ContactUsSection;
