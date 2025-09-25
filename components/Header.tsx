"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-20 transition-colors duration-300
          border-[#F5F1E9]
          ${scrolled ? "bg-[#f3eee7] shadow-lg" : "bg-gradient-to-b from-black/70 to-transparent"}`}
      >
        <button
          onClick={() => setOpen(true)}
          className={`flex items-center gap-2 ${scrolled ? "text-black" : "text-white"} hover:opacity-80`}
        >
          <Menu className="w-6 h-6" />
          <span className="text-sm sm:text-base font-medium">Menu</span>
        </button>

        <div className="flex items-center">
          <Link href="/">
            <Image
              src={scrolled ? "/image/logo_green.jpg" : "/image/logo.jpg"}
              alt="Logo"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${
          open ? "bg-black/50" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          {/* <h2 className="text-lg font-semibold">Menu AA</h2> */}
          <Image
                src="/image/logo_green.jpg"
                alt="Logo"
                width={200}
                height={20}
                className="h-10 w-auto"
              />
          <button onClick={() => setOpen(false)} className="hover:opacity-80">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-grow flex-col items-center justify-center gap-4 p-4">
          <Link href="/" className="hover:underline" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/#about" className="hover:underline" onClick={() => setOpen(false)}>About</Link>
          <Link href="/#services" className="hover:underline" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/#contact" className="hover:underline" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/booking" className="hover:underline" onClick={() => setOpen(false)}>Booking</Link>
        </nav>
      </div>
    </>
  );
}
