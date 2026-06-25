import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://deertnadairy.com'),
  title: "ديرتنا | الطبيعة في كل قطرة - ألبان وأجبان أردنية",
  description: "اكتشف الجودة الفاخرة والطعم الأصيل مع منتجات ديرتنا من الألبان والأجبان والشنينة. تجربة فريدة تجمع بين التقاليد والحداثة في الأردن.",
  keywords: ["شنينة", "شنينة ديرتنا", "ألبان", "أجبان", "حليب طازج", "ديرتنا", "منتجات ألبان أردنية", "فطور أردني", "لبنة", "عكاوي", "حلوم"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ديرتنا | الطبيعة في كل قطرة",
    description: "اكتشف الجودة الفاخرة والطعم الأصيل مع منتجات ديرتنا من الألبان والأجبان والشنينة.",
    url: 'https://deertnadairy.com',
    siteName: 'ديرتنا',
    images: [
      {
        url: '/logo-deiratna-v2.png',
        width: 1024,
        height: 682,
        alt: 'Deertna Logo',
      },
    ],
    locale: 'ar_JO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ديرتنا | الطبيعة في كل قطرة",
    description: "اكتشف الجودة الفاخرة والطعم الأصيل مع منتجات ديرتنا.",
    images: ['/logo-deiratna-v2.png'],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://deertnadairy.com/#organization",
      "name": "Deertna | ديرتنا",
      "url": "https://deertnadairy.com",
      "logo": "https://deertnadairy.com/logo-deiratna-v2.png",
      "sameAs": []
    },
    {
      "@type": "WebSite",
      "@id": "https://deertnadairy.com/#website",
      "url": "https://deertnadairy.com",
      "name": "Deertna | ديرتنا",
      "description": "الطبيعة في كل قطرة - ألبان وأجبان أردنية",
      "publisher": {
        "@id": "https://deertnadairy.com/#organization"
      },
      "inLanguage": "ar-JO"
    },
    {
      "@type": "LocalBusiness",
      "name": "Deertna Dairy",
      "image": "https://deertnadairy.com/logo-deiratna-v2.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Amman",
        "addressRegion": "Amman Governorate",
        "addressCountry": "JO"
      },
      "url": "https://deertnadairy.com",
      "telephone": "+962000000000"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-deiratna-white text-deiratna-dark font-sans overflow-x-hidden selection:bg-deiratna-green selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
