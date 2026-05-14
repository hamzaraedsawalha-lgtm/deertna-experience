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
  title: "ديرتنا | الطبيعة في كل قطرة - ألبان وأجبان أردنية",
  description: "اكتشف الجودة الفاخرة والطعم الأصيل مع منتجات ديرتنا من الألبان والأجبان والشنينة. تجربة فريدة تجمع بين التقاليد والحداثة في الأردن.",
  keywords: ["شنينة", "شنينة ديرتنا", "ألبان", "أجبان", "حليب طازج", "ديرتنا", "منتجات ألبان أردنية", "فطور أردني", "لبنة", "عكاوي", "حلوم"],
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
