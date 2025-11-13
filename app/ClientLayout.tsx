"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define routes where header/footer should be hidden
  const noLayoutRoutes = ["/success"];

  const hideLayout = noLayoutRoutes.some(path => pathname.startsWith(path));

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
