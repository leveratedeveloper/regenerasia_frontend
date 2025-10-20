import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

const alta = localFont({
  src: [
    {
      path: "../public/fonts/alta-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-alta",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Regenerasia - Restart, Restore, Regenerate",
  description: "Human Regenerator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${alta.variable} antialiased`}
      >
        {/* GA4 Script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-007TQT3W99`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
             window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-007TQT3W99');
          `}
        </Script>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
