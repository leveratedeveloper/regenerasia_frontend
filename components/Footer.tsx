
"use client"
import React from 'react';

import { WhatsappIcon } from './icons/WhatsappIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { EnvelopeIcon } from './icons/EnvelopeIcon';
import Image from "next/image";
const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#F5F1E9] py-10 px-6 sm:px-8">
      <div className="max-w-12xl w-full flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
        
        {/* Left: Logo + Address */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <Image
            src="/image/logo_green.jpg"
            alt="Logo"
            width={100}
            height={40}
            className="h-24 w-auto"
          />
          <div className="text-gray-700 text-base leading-relaxed mt-2">
            <h3 className="font-serif text-2xl text-gray-800 mb-2">
              AYANA Midplaza Jakarta
            </h3>
            <p className="text-gray-500">
              Jl. Jenderal Sudirman No.Kav 10-11, RT.10/RW.11,
              <br />
              Karet Tengsin, Kecamatan Tanah Abang, Kota Jakarta Pusat,
              <br />
              Daerah Khusus Ibukota Jakarta 10220
            </p>
          </div>
        </div>

        {/* Right: stick bottom right */}
        <div className="flex flex-col items-center lg:items-end gap-5 justify-end flex-1">
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Whatsapp"
              className="bg-[#3C4D34] text-white p-3 rounded-full hover:bg-opacity-80 transition-all duration-300"
            >
              <WhatsappIcon className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="bg-[#3C4D34] text-white p-3 rounded-full hover:bg-opacity-80 transition-all duration-300"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Email"
              className="bg-[#3C4D34] text-white p-3 rounded-full hover:bg-opacity-80 transition-all duration-300"
            >
              <EnvelopeIcon className="w-6 h-6" />
            </a>
          </div>
          <p className="text-sm text-gray-500 text-right">
            Copyright © 2025 Regenerasia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
