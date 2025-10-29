import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import localFont from "next/font/local";
import Breadcrumb from "@/components/Breadcrumb";

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
  icons: {
    icon: "/favicon.ico", 
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Preload custom Alta font for faster LCP rendering */}
        <link
          rel="preload"
          href="/fonts/alta-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style>{`
          :root {
            --font-fallback: system-ui, -apple-system, Helvetica, Arial, sans-serif;
          }
        `}</style>
      </head>

      <body className={`${alta.variable} antialiased`}>
        {/* ✅ GA4 Script - load lazily to avoid blocking render */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-007TQT3W99"
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
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
