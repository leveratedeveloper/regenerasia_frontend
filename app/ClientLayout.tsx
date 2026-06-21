"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer, { type FooterSettings } from "@/components/Footer";

export interface LogoSettings {
  logo?: string | null;
  logo_white?: string | null;
  favicon?: string | null;
}

interface ClientLayoutProps {
  children: React.ReactNode;
  footerSettings?: FooterSettings | null;
  logoSettings?: LogoSettings | null;
}

export default function ClientLayout({
  children,
  footerSettings,
  logoSettings,
}: ClientLayoutProps) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/success"];
  const hideLayout = noLayoutRoutes.some((path) => pathname.startsWith(path));

  return (
    <>
      {!hideLayout && <Header logoSettings={logoSettings} />}
      {children}
      {!hideLayout && <Footer settings={footerSettings} />}
    </>
  );
}
