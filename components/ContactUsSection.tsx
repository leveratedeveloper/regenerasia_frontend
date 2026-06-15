import React from "react";

interface ContactUsSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  bgImage?: string | null;
}

const ContactUsSection: React.FC<ContactUsSectionProps> = ({
  title       = "Regenerate with Regenerasia Today",
  description = "Contact us to book sessions on the Human Regenerator or to enquire about purchasing for your home or business.",
  buttonText  = "Contact Us",
  buttonUrl   = "/booking",
  bgImage,
}) => {
  const bg = bgImage || "/image/bg_contact.webp";

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[650px] rounded-xl overflow-hidden">
        {/* Left: Image */}
        <div className="md:col-span-2 w-full h-full">
          <img
            src={bg}
            alt="Contact background"
            className="w-full h-full object-cover object-center md:object-right"
          />
        </div>

        {/* Right: Content */}
        <div className="md:col-span-1 flex flex-col justify-between p-6 md:p-10 lg:p-10 bg-white">
          <section className="text-left max-w-md">
            <h1 className="font-alta text-3xl md:text-4xl lg:text-4xl text-[#768c43] leading-snug">
              {title}
            </h1>
            <p className="font-helvetica text-justify mt-2 text-stone-700">
              {description}
            </p>
            <a
              href={buttonUrl}
              className="inline-block bg-green-900 rounded-xl text-white px-6 py-2 mt-4 hover:bg-green-800 transition"
            >
              {buttonText}
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
