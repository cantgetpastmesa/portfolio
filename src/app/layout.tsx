import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FloatingNav } from "@/components/ui/floating-nav";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bitcountFont = localFont({
  src: '../../fonts/Bitcount_Prop_Single/BitcountPropSingle-VariableFont_CRSV,ELSH,ELXP,slnt,wght.ttf',
  variable: '--font-bitcount',
  display: 'swap',
  fallback: ['system-ui'],
});

const googleSansCode = localFont({
  src: '../../fonts/Google_Sans_Code/GoogleSansCode-VariableFont_wght.ttf',
  variable: '--font-google-sans-code',
  display: 'swap',
  fallback: ['monospace'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Felipe A. Mesa N. - Portfolio",
    template: "%s | Felipe A. Mesa N."
  },
  description: "Portfolio de Felipe Andrés Mesa Niño - Computer Science, AI/ML, Robotics",
  keywords: ["portfolio", "computer science", "AI", "machine learning", "robotics", "research"],
  authors: [{ name: "Felipe Andrés Mesa Niño" }],
  creator: "Felipe Andrés Mesa Niño",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Felipe A. Mesa N. - Portfolio",
    description: "Portfolio de Felipe Andrés Mesa Niño - Computer Science, AI/ML, Robotics",
    siteName: "Felipe A. Mesa N. Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felipe A. Mesa N. - Portfolio",
    description: "Portfolio de Felipe Andrés Mesa Niño - Computer Science, AI/ML, Robotics",
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bitcountFont.variable} ${googleSansCode.variable} antialiased`}
      >
        <LanguageProvider>
          <FloatingNav />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
