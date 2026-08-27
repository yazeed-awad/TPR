import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tpr-saudi-partnership.vercel.app";

export const metadata: Metadata = {
  title: "TPR السعودية | فرصة الشراكة",
  description: "فرصة للمراكز التعليمية والمدارس والمستثمرين في السعودية لتمثيل تجربة TPR For English التفاعلية للأطفال.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "TPR السعودية | فرصة الشراكة المحلية",
    description: "ابدأ قصة نجاح استثمارية في المملكة العربية السعودية مع TPR For English.",
    images: [{ url: "/og.png", width: 1600, height: 900, alt: "TPR السعودية — فرصة الشراكة المحلية" }],
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "TPR السعودية | فرصة الشراكة المحلية",
    description: "ابدأ قصة نجاح استثمارية في المملكة العربية السعودية مع TPR For English.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/media/tpr-logo.png",
    shortcut: "/media/tpr-logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
