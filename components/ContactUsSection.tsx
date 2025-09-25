import React from "react";
import { Cormorant_Garamond, Roboto } from "next/font/google";


const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // choose weights you need
    style: ["normal", "italic"], // aktifkan italic
});

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300"],
});

const ContactUsSection = () => {
  const imageData = {
    src: "/image/bg_contact.png",
    alt: "A serene lake surrounded by lush green forests and mountains in the background under a cloudy sky."
  };

  return (
    <section className="bg-[rgb(243,238,231)] overflow-hidden py-16 px-6 md:px-12">
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
      <div className="md:col-span-1 flex items-left p-6 md:p-10 lg:p-10 bg-white">
        <section className="text-left max-w-md">
          <h1 className={`${cormorant.className} text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-snug`}>
            Regenerate with <br />
            Regenerasia <span className="italic text-green-900">Today</span>
          </h1>

          <p className={`${roboto.className} mt-2 text-gray-700`}>
            Contact us to book sessions on the Human Regenerator or to enquire about purchasing for your home or business.
          </p>

          <button className="mt-6 bg-green-900 text-white px-6 py-2 hover:bg-green-800 transition">
            Contact Us
          </button>

          {/* <ul>
            <li className={`${roboto.className} mt-2 text-gray-700`}>
              Address: <br />
              Ayana Midplaza Jakarta <br />
              Jl. Jenderal Sudirman No.Kav 10-11, RT.10/RW.11, Karet Tengsin, Kecamatan Tanah Abang, Kota Jakarta Pusat,
Daerah Khusus Ibukota Jakarta 10220
            </li>
            <li className={`${roboto.className} mt-2 text-gray-700`}>
              <h3>
              <a href="tel:+62877123456" className="text-green-900">(+62) 877123456</a>
              </h3>
            </li>
            <li className={`${roboto.className} mt-4 text-gray-700`}>
              <h3>
              <a href="mailto:booking@regenerasia.co.id" className="text-green-900">booking@regenerasia.co.id</a>
              </h3>
            </li>
          </ul> */}
        </section>
      </div>
    </div>

  </section>  

  );
};

export default ContactUsSection;
