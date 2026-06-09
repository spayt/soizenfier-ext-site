import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Navigation from "@/components/Navigation";
import { COMPANY_NAME } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_NAME} — Web Design & Development`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description:
    "Custom websites, web apps, and mobile apps for small businesses in Canada. Fast, SEO-friendly, and professionally maintained. Starting at $500 CAD.",
  openGraph: {
    siteName: COMPANY_NAME,
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2B8RSCLDYD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2B8RSCLDYD');
          `}
        </Script>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
