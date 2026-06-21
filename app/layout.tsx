import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ClientLayout from "./ClientLayout";
import { getGlobalSettings } from "@/lib/api";

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

export async function generateMetadata(): Promise<Metadata> {
  const globalSettings = await getGlobalSettings();
  const favicon = globalSettings?.site?.favicon || "/Regenerasia-G.svg";

  return {
    title: "Regenerasia - Recharge, Regenerate, Restart",
    description:
      "Regenerasia introduce a new era of wellness and longevity to Indonesia with CAP+ Technology.",
    icons: {
      icon: favicon,
      apple: favicon,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSettings = await getGlobalSettings();

  const footerSettings = globalSettings
    ? {
        logo: globalSettings.site?.logo,
        address: globalSettings.site?.company_address,
        whatsapp_url: globalSettings.site?.whatsapp_url,
        instagram_url: globalSettings.social?.instagram_url,
        email: globalSettings.site?.company_email,
        copyright: globalSettings.site?.copyright_text,
      }
    : null;

  const logoSettings = globalSettings
    ? {
        logo: globalSettings.site?.logo ?? null,
        logo_white: globalSettings.site?.logo_white ?? null,
        favicon: globalSettings.site?.favicon ?? null,
      }
    : null;

  return (
    <html lang="en">
      <head>
        {/* Preload custom Alta font for faster LCP rendering */}
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
        {/* GA4 Script - load lazily to avoid blocking render */}
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
        <ClientLayout footerSettings={footerSettings} logoSettings={logoSettings}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
