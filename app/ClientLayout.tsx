"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer, { type FooterSettings } from "@/components/Footer";

interface ClientLayoutProps {
  children: React.ReactNode;
  footerSettings?: FooterSettings | null;
}

export default function ClientLayout({ children, footerSettings }: ClientLayoutProps) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/success"];
  const hideLayout = noLayoutRoutes.some(path => pathname.startsWith(path));

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer settings={footerSettings} />}
    </>
  );
}
