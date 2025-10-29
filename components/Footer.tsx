
"use client"
import React from 'react';

import { WhatsappIcon } from './icons/WhatsappIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { EnvelopeIcon } from './icons/EnvelopeIcon';
import Image from "next/image";
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

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#F5F1E9] py-5 px-6 sm:px-8">
      <div className="max-w-12xl w-full flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
        
        {/* Left: Logo + Address */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <Image
            src="/image/new-logo.webp"
            alt="Logo"
            width={200}
            height={40}
            className="h-18 w-auto"
          />
          <div className="text-gray-700 text-base leading-relaxed mt-2">
            <p className={`${roboto.className} text-gray-500 text-xs md:text-base` }>
              AYANA Midplaza Jakarta<br/>
              Jl. Jenderal Sudirman No.Kav 10-11, RT.10/RW.11,
              <br />
              Karet Tengsin, Kecamatan Tanah Abang, Kota Jakarta Pusat,
              <br />
              Daerah Khusus Ibukota Jakarta 10220
            </p>
          </div>
        </div>

        {/* Right: stick bottom right */}
        <div className="flex flex-col items-center lg:items-end gap-4 justify-end">
          <div className="flex gap-3">
            <a
            href="https://wa.me/6281117019888?text=Hello%20Regenerasia%20Team!"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="bg-[#3C4D34] text-white p-3 rounded-full hover:bg-opacity-80 transition-all duration-300"
            >
              <WhatsappIcon className="w-4 h-4" />
            </a>

            <a
              href="https://www.instagram.com/regenerasia.longevity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="bg-[#3C4D34] text-white p-3 rounded-full hover:bg-opacity-80 transition-all duration-300"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <a
                href="mailto:customer.service@regenerasia.co.id"
                aria-label="Email"
                className="bg-[#3C4D34] text-white p-3 rounded-full hover:bg-opacity-80 transition-all duration-300"
              >

              <EnvelopeIcon className="w-4 h-4" />
            </a>
          </div>
          <p className={`${roboto.className} text-xs md:text-sm  text-gray-500 text-right `}>
            Copyright © 2025 Regenerasia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
