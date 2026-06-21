import React from 'react';
import Image from "next/image";
import { Roboto } from "next/font/google";
import { WhatsappIcon } from './icons/WhatsappIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { EnvelopeIcon } from './icons/EnvelopeIcon';

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300"],
});

export interface FooterSettings {
  logo?: string | null;
  address?: string | null;
  whatsapp_url?: string | null;
  instagram_url?: string | null;
  email?: string | null;
  copyright?: string | null;
}

interface FooterProps {
  settings?: FooterSettings | null;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  const logo         = settings?.logo         ?? "/image/logo-regenerasia.webp";
  const address      = settings?.address      ?? "AYANA Midplaza Jakarta\nJl. Jenderal Sudirman No.Kav 10-11, RT.10/RW.11,\nKaret Tengsin, Kecamatan Tanah Abang, Kota Jakarta Pusat,\nDaerah Khusus Ibukota Jakarta 10220";
  const whatsappUrl  = settings?.whatsapp_url ?? "https://wa.me/6281117019888";
  const instagramUrl = settings?.instagram_url ?? "https://www.instagram.com/regenerasia.longevity";
  const email        = settings?.email         ?? "customer.service@regenerasia.co.id";
  const copyright    = settings?.copyright     ?? "Copyright © 2026 Regenerasia. All rights reserved.";

  return (
    <footer className="bg-white border-t border-[#F5F1E9] py-5 px-6 sm:px-8">
      <div className="max-w-12xl w-full flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">

        {/* Left: Logo + Address */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <Image
            src={logo}
            alt="Logo"
            width={200}
            height={40}
            className="h-18 w-auto"
            unoptimized={logo.startsWith("http")}
          />
          <div className="text-gray-700 text-base leading-relaxed mt-2">
            <p className={`${roboto.className} text-gray-500 text-xs md:text-sm`}>
              {address.split('\n').map((line: string, i: number) => (
                <React.Fragment key={i}>{line}{i < address.split('\n').length - 1 && <br />}</React.Fragment>
              ))}
            </p>
          </div>
        </div>

        {/* Right: social + copyright */}
        <div className="flex flex-col items-center lg:items-end gap-4 justify-end">
          <div className="flex gap-3">
            <a
              href={`${whatsappUrl}?text=Hello%20Regenerasia%20Team!`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="bg-[#3C4D34] text-white p-3 rounded-full hover:bg-opacity-80 transition-all duration-300"
            >
              <WhatsappIcon className="w-4 h-4" />
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="bg-[#3C4D34] text-white p-3 rounded-full hover:bg-opacity-80 transition-all duration-300"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${email}`}
              aria-label="Email"
              className="bg-[#3C4D34] text-white p-3 rounded-full hover:bg-opacity-80 transition-all duration-300"
            >
              <EnvelopeIcon className="w-4 h-4" />
            </a>
          </div>
          <p className={`${roboto.className} text-xs md:text-sm text-gray-500 text-right`}>
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
