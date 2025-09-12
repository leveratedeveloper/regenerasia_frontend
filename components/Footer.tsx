import React from "react";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-8 px-6 md:px-12">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between max-w-7xl mx-auto gap-8">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <img
            src="/logo.png" // replace with your logo path
            alt="Regenerasia Logo"
            className="h-14"
          />
        </div>

        {/* Middle: Address */}
        <div className="text-center md:text-left text-gray-700">
          <h3 className="text-lg font-semibold">AYANA Midplaza Jakarta</h3>
          <p className="mt-2 text-sm leading-relaxed">
            Jl. Jenderal Sudirman No.Kav 10-11, RT.10/RW.11,<br />
            Karet Tengsin, Kecamatan Tanah Abang, Kota Jakarta Pusat,<br />
            Daerah Khusus Ibukota Jakarta 10220
          </p>
        </div>

        {/* Right: Socials + Copyright */}
        <div className="flex flex-col items-center md:items-end gap-4">
          {/* Social Icons */}
          <div className="flex gap-3">
            <a
              href="https://wa.me/628123456789" // update link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-900 text-white p-3 rounded-full hover:bg-green-800 transition"
            >
              <FaWhatsapp size={18} />
            </a>
            <a
              href="https://instagram.com/regenerasia" // update link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-900 text-white p-3 rounded-full hover:bg-green-800 transition"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="mailto:info@regenerasia.com" // update link
              className="bg-green-900 text-white p-3 rounded-full hover:bg-green-800 transition"
            >
              <FaEnvelope size={18} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-600">
            Copyright © {new Date().getFullYear()} Regenerasia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
