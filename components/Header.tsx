"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBreadcrumb, setShowBreadcrumb] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);

      // Hide breadcrumb when scrolling down, show when scrolling up
      if (currentY > lastScrollY && currentY > 50) {
        setShowBreadcrumb(false);
      } else {
        setShowBreadcrumb(true);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // --- Breadcrumb logic ---
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((seg) => seg !== "");

  return (
    <>
      {/* ===== HEADER BAR ===== */}
      <header
        className={`fixed top-0 left-0 w-full z-20 transition-all duration-300 ${
          scrolled ? "bg-[#f3eee7] shadow-lg" : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-2">
          {/* Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className={`flex items-center gap-2 ${
              scrolled ? "text-black" : "text-white"
            } hover:opacity-80`}
          >
            <Menu className="w-6 h-6" />
            <span className="text-sm sm:text-base font-medium">Menu</span>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/image/new-logo.webp"
              alt="Logo"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* ===== BREADCRUMB ===== */}
        {pathSegments.length > 0 && (
          <nav
          className={`px-6 pb-3 text-sm transition-all duration-500 ease-in-out ${
            scrolled ? "opacity-100 max-h-10" : "to-transparent"
          }`}
        >
          <ol
            className={`flex flex-wrap items-center space-x-1 py-2 rounded-md transition-colors duration-500 ${
              scrolled ? "text-[#3C4D34]" : "text-white"
            }`}
          >
            <li>
              <Link
                href="/"
                className={`hover:underline font-medium ${
                  scrolled ? "text-[#3C4D34]" : "text-white"
                }`}
              >
                Home
              </Link>
            </li>
            {pathSegments.map((segment, index) => {
              const href = "/" + pathSegments.slice(0, index + 1).join("/");
              const isLast = index === pathSegments.length - 1;
              let label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
        
              if (label.toLowerCase() === "aboutus") label = "About Us";
              return (
                <li key={href} className="flex items-center">
                  <span className={`mx-2 ${scrolled ? "text-[#3C4D34]" : "text-gray-200"}`}>/</span>
                  {isLast ? (
                    <span
                      className={`font-semibold ${
                        scrolled ? "text-[#3C4D34]" : "text-gray-100"
                      }`}
                    >
                      {label}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className={`hover:underline font-medium ${
                        scrolled ? "text-[#3C4D34]" : "text-white"
                      }`}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        
        
        )}
      </header>

      {/* ===== OVERLAY ===== */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${
          open ? "bg-black/50" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* ===== SIDE MENU ===== */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white text-black shadow-lg z-40 transform transition-transform duration-300 ease-in-out flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <Image
            src="/image/new-logo.webp"
            alt="Logo"
            width={160}
            height={40}
            className="h-10 w-auto"
          />
          <button onClick={() => setOpen(false)} className="hover:opacity-80">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-grow flex-col items-center justify-center gap-4 p-4">
          <Link href="/" className="hover:underline" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/aboutus" className="hover:underline" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/treatment" className="hover:underline" onClick={() => setOpen(false)}>
            Treatment
          </Link>
          <Link href="/booking" className="hover:underline" onClick={() => setOpen(false)}>
            Booking
          </Link>
          <Link href="/business" className="hover:underline" onClick={() => setOpen(false)}>
            Business Enquiries
          </Link>
        </nav>
      </div>
    </>
  );
}
